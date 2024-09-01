const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(bodyParser.json());

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("e");
  const collection = db.collection("user");

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/pdpa.html', (req, res) => {
    res.sendFile(__dirname + '/pdpa.html');
  });

  app.get('/profile.html', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
  });

  app.get('/home.html', (req, res) => {
    res.sendFile(__dirname + '/home.html');
  });

  app.get('/createProfile.html', (req, res) => {
    res.sendFile(__dirname + '/createProfile.html');
  });

  app.get('/parents.html', (req, res) => {
    res.sendFile(__dirname + '/parents.html');
  });

  app.get('/child.html', (req, res) => {
    res.sendFile(__dirname + '/child.html');
  });

  // Route to fetch and display data
  app.get('/api/data', async (req, res) => {
    try {
      const data = await collection.find({}).toArray();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
      res.status(500).send("Error fetching data");
    }
  });

  // Route to handle form submission
  app.post('/submit', async (req, res) => {
    try {
      const { name, email, password, firstTime, employmentStatus, challenges, childGender, childCondition } = req.body;

      // Check if a user with the provided email already exists
      const existingUser = await collection.findOne({ name });

      if (existingUser) {
        // If user exists, update their information
        await collection.updateOne(
          { _id: existingUser._id },
          { $set: {
            name,
            password, // Be cautious with how you handle password
            parents: {
              firstTime: firstTime,
              employmentStatus: employmentStatus,
              challenges: challenges
            },
            child: {
              gender: childGender,
              condition: childCondition
            }
          }}
        );
        console.log("User updated:", existingUser._id);
      } else {
        // If user doesn't exist, create a new user with an auto-incremented ID
        const lastUser = await collection.find().sort({ id: -1 }).limit(1).toArray();
        const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1; // Auto-increment ID

        await collection.insertOne({
          id: newId,
          name,
          email,
          password, // Be cautious with how you handle password
          parents: {
            firstTime: firstTime,
            employmentStatus: employmentStatus,
            challenges: challenges
          },
          child: {
            gender: childGender,
            condition: childCondition
          }
        });
        console.log("New user created with ID:", newId);
      }

      res.redirect('/profile.html'); // Redirect to the profile page after submission
    } catch (error) {
      console.error("Failed to submit data", error);
      res.status(500).send("Error submitting data");
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main().catch(console.error);
