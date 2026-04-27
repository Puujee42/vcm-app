const fs = require('fs');
const mongoose = require('mongoose');

async function fix() {
  try {
    // 1. Read MONGODB_URI directly from .env to avoid dependency issues
    const envFile = fs.readFileSync('.env', 'utf-8');
    const match = envFile.match(/^MONGODB_URI=(.*)$/m);
    const uri = match ? match[1].trim() : null;

    if (!uri) {
      console.error("❌ MONGODB_URI not found in .env file.");
      return;
    }

    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected successfully.");

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // 2. Find existing indexes
    const indexes = await usersCollection.indexes();
    const hasClerkIndex = indexes.some(idx => idx.name === 'clerkId_1');
    
    if (hasClerkIndex) {
      console.log("⚠️ Found legacy index: 'clerkId_1'. Dropping it now...");
      await usersCollection.dropIndex('clerkId_1');
      console.log("✅ Successfully dropped 'clerkId_1' index!");
    } else {
      console.log("✅ 'clerkId_1' index does not exist. Your database is already good to go!");
    }

  } catch (error) {
    console.error("❌ Error during execution:", error);
  } finally {
    // Clean up
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB.");
  }
}

fix();
