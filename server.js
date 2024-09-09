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

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("EmpathInteract");
  const collection = db.collection("test");

  // Serve HTML Pages
  app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
  app.get('/profile.html', (req, res) => res.sendFile(__dirname + '/profile.html'));
  app.get('/home.html', (req, res) => res.sendFile(__dirname + '/home.html'));
  app.get('/newAccount.html', (req, res) => res.sendFile(__dirname + '/newAccount.html'));

  // Fetch User Data
  app.get('/api/data', async (req, res) => {
    try {
      const data = await collection.find({}).toArray();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
      res.status(500).send("Error fetching data");
    }
  });

  // Fetch User Id
  app.get('/api/getUserId', (req, res) => {
    if (req.session && req.session.userId) {
      res.json({ userId: req.session.userId });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  });


  // Register New User
  app.post('/register', async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
  
      if (password !== confirmPassword) {
        // Redirect back to the form with an error message
        return res.status(400).send('<script>alert("Passwords do not match."); window.location.href = "/newAccount.html";</script>');
      }
  
      // Check if email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).send('<script>alert("Email already exists."); window.location.href = "/newAccount.html";</script>');
      }
  
      // Generate new user ID (auto-increment)
      const lastUser = await collection.find().sort({ id: -1 }).limit(1).toArray();
      const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1; // Auto-increment ID
  
      // Insert the new user
      const result = await collection.insertOne({
        id: newId,
        email,
        password, // Make sure to hash the password in a real-world scenario
      });
  
      // Store user ID in session
      req.session.userId = result.insertedId; // MongoDB generates a unique ID for each document
  
      console.log("New user created with ID:", newId);
      res.redirect('/createProfile.html'); // Redirect to the profile page after registration
  
    } catch (error) {
      console.error("Failed to register user", error);
      res.status(500).send("Error registering user");
    }
  });
  
  
   // Create New User Profile
  app.post('/create', async (req, res) => {
    try {
      // Retrieve user ID from session
      const userId = req.session.userId;
  
      // If the user is not logged in or session expired
      if (!userId) {
        return res.status(401).send('<script>alert("Session expired. Please log in again."); window.location.href = "/newAccount.html";</script>');
      }
  
      // Extract profile data from the request body
      const { name, firstTime, employmentStatus, challenges, childGender, childCondition } = req.body;
  
      // Update the user's profile in the database
      await collection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            name,
            parents: {
              firstTime: firstTime,
              employmentStatus: employmentStatus,
              challenges: challenges
            },
            child: {
              gender: childGender,
              condition: childCondition
            }
          }
        }
      );
  
      console.log("User profile updated for ID:", userId);
      res.redirect('/profile.html'); // Redirect to the profile page after submission
  
    } catch (error) {
      console.error("Failed to update user profile", error);
      res.status(500).send("Error updating user profile");
    }
  });

  // Update User Profile
  app.post('/update', async (req, res) => {
    try {
      const { userId, name, email, firstTime, employmentStatus, challenges, childGender, childCondition } = req.body;
  
      console.log('Received data:', req.body); // Log incoming data
  
      // Validate data coming from the client
      if (!userId || !email || !name || !firstTime || !employmentStatus || !challenges || !childGender || !childCondition) {
        console.error("Incomplete data received");
        return res.status(400).send("Incomplete data. Please check all fields.");
      }
  
      // Convert userId to ObjectId
      const objectId = new ObjectId(userId);
  
      // Check if a user with the provided id exists
      const existingUser = await collection.findOne({ _id: objectId }); // Use ObjectId for searching by _id
  
      if (existingUser) {
        console.log("User found:", existingUser); // Log the found user
  
        // If user exists, update their information
        const updateResult = await collection.updateOne(
          { _id: existingUser._id },
          {
            $set: {
              name,
              email,
              parents: {
                firstTime: firstTime,
                employmentStatus: employmentStatus,
                challenges: challenges,
              },
              child: {
                gender: childGender,
                condition: childCondition,
              },
            },
          }
        );
  
        if (updateResult.modifiedCount === 1) {
          console.log("User profile updated:", existingUser._id); // Log success
          return res.status(200).send("Profile updated successfully");
        } else {
          console.error("Failed to update profile for user:", existingUser._id); // Log failure
          return res.status(500).send("Error updating profile. Please try again.");
        }
      } else {
        console.error("User not found with id:", userId); // Log if the user is not found
        return res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error updating user profile", error); // Log the actual error
      return res.status(500).send("Error updating user profile");
    }
  });
  

// Change user password 
app.post('/changePassword', async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    console.log('Received data:', req.body); // Log incoming data

    // Validate data coming from the client
    if (!oldPassword || !newPassword) {
      console.error("Incomplete data received");
      return res.status(400).send("Incomplete data. Please check all fields.");
    }

      // Convert userId to ObjectId
      const objectId = new ObjectId(userId);
  
      // Check if a user with the provided id exists
      const existingUser = await collection.findOne({ _id: objectId }); // Use ObjectId for searching by _id
    
    if (existingUser) {
      console.log("User found:", userId); // Log the found user

      // If user exists, update their information
      const updateResult = await collection.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            password: newPassword
          }
        }
      );

      if (updateResult.modifiedCount === 1) {
        console.log("User profile updated:", existingUser._id); // Log success
        return res.status(200).send("Profile updated successfully");
      } else {
        console.error("Failed to update profile for user:", existingUser._id); // Log failure
        return res.status(500).send("Error updating profile. Please try again.");
      }
    } else {
      console.error("User not found with id:", userId); // Log if the user is not found
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user profile", error); // Log the actual error
    return res.status(500).send("Error updating user profile");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
}

main().catch(console.error);
