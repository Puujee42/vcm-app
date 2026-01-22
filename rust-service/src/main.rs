use axum::{
    extract::{Query, State},
    routing::get,
    Json, Router,
};
use dotenv::dotenv;
use futures::stream::TryStreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId},
    options::ClientOptions,
    Client, Collection,
};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct LocalizedString {
    en: String,
    mn: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct LocalizedArray {
    en: Vec<String>,
    mn: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Opportunity {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    id: Option<ObjectId>,
    #[serde(rename = "type")]
    opportunity_type: String,
    title: LocalizedString,
    provider: LocalizedString,
    location: LocalizedString,
    deadline: String,
    #[serde(rename = "postedDate")]
    posted_date: String,
    description: LocalizedString,
    requirements: Option<LocalizedArray>,
    tags: Option<Vec<String>>,
    link: String,
    image: Option<String>,
}

#[derive(Clone)]
struct AppState {
    collection: Collection<Opportunity>,
}

#[derive(Deserialize)]
struct SearchParams {
    q: Option<String>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let uri = env::var("MONGODB_URI").expect("MONGODB_URI must be set");
    let mut client_options = ClientOptions::parse(&uri).await?;
    
    // Set application name for debugging
    client_options.app_name = Some("RustSearchService".to_string());

    let client = Client::with_options(client_options)?;
    let db = client.database("test"); // Default to 'test' if not specified in URI, or parse from URI
    // Note: Mongoose usually defaults to 'test' unless specified. 
    // In a real app, you might want to extract the DB name from the URI or env var.
    
    let collection = db.collection::<Opportunity>("opportunities");

    let state = AppState { collection };

    let app = Router::new()
        .route("/search", get(search_handler))
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await?;
    println!("Rust Search Service listening on {}", listener.local_addr()?);
    axum::serve(listener, app).await?;

    Ok(())
}

async fn search_handler(
    State(state): State<AppState>,
    Query(params): Query<SearchParams>,
) -> Json<Vec<Opportunity>> {
    let mut filter = doc! {};

    if let Some(query) = params.q {
        if !query.is_empty() {
            // Simple regex search on English title
            // In production, use MongoDB Text Search or Atlas Search for performance
            filter = doc! {
                "title.en": {
                    "$regex": query,
                    "$options": "i" 
                }
            };
        }
    }

    let mut cursor = match state.collection.find(filter, None).await {
        Ok(cursor) => cursor,
        Err(_) => return Json(vec![]),
    };

    let mut opportunities = Vec::new();
    while let Ok(Some(doc)) = cursor.try_next().await {
        opportunities.push(doc);
    }

    Json(opportunities)
}
