# Rust Search Service

This is a high-performance microservice written in Rust to handle search operations for the Visa application.

## Prerequisites

- Rust and Cargo installed
- MongoDB instance (running and populated)

## Setup

1.  Create a `.env` file in this directory or ensure the parent `.env` is accessible.
2.  Set `MONGODB_URI` in `.env`:
    ```bash
    MONGODB_URI=mongodb+srv://...
    ```

## Running

```bash
cargo run
```

The service will start on `http://localhost:8080`.

## API

### Search Opportunities

**Endpoint:** `GET /search`

**Query Parameters:**
- `q`: Search query string (searches English titles)

**Example:**
```bash
curl "http://localhost:8080/search?q=scholarship"
```
