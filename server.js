const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI;

async function main() {
  // Connect to MongoDB
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");

  // Reference the database and collection
  const db = client.db("e"); 
  const collection = db.collection("user"); 

  // Set up EJS as the view engine
  app.set('view engine', 'ejs');

  // Route to fetch and display data
  app.get('/', async (req, res) => {
    try {
      const data = await collection.find({}).toArray();
      console.log("Fetched data:", data); 
      res.render('index', { data: data });
    } catch (error) {
      console.error("Failed to fetch data", error); 
      res.status(500).send("Error fetching data");
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Call the main function to set up the server and database connection
main().catch(console.error);
