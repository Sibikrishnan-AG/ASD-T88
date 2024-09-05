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

  app.get('/newAccount.html', (req, res) => {
    res.sendFile(__dirname + '/newAccount.html');
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
  // app.post('/update', async(req, res) => {
  //   try {

  //           const { name, email, password, firstTime, employmentStatus, challenges, childGender, childCondition } = req.body;

  //           const existingUser = await collection.findOne({ email });

  //           if (existingUser) {
  //                   // If user exists, update their information
  //                   await collection.updateOne(
  //                     { _id: existingUser._id },
  //                     { $set: {
  //                       name,
  //                       email,
  //                       password,
  //                       parents: {
  //                         firstTime: firstTime,
  //                         employmentStatus: employmentStatus,
  //                         challenges: challenges
  //                       },
  //                       child: {
  //                         gender: childGender,
  //                         condition: childCondition
  //                       }
  //                     }}
  //                   );
  //                   console.log("User updated:", existingUser._id);
  //             } 

  //                   res.redirect('profile.html?name=' + encodeURIComponent(name)); // Redirect to the profile page after submission


  //   } catch (error) {
      
  //     console.error("Failed to submit data", error);
  //     res.status(500).send("Error submitting data");

  //   }
  // });

   // Create New User Profile
app.post('/update', async (req, res) => {
  try {

    // Extract profile data from the request body
    const { name, firstTime, employmentStatus, challenges, childGender, childCondition } = req.body;

           const existingUser = await collection.findOne({ email });

            if (existingUser) {
                    // If user exists, update their information
                    await collection.updateOne(
                      { _id: existingUser._id },
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

  }} catch (error) {
    console.error("Failed to update user profile", error);
    res.status(500).send("Error updating user profile");
  }
});
  

  // Create/ Update User Profile
  // app.post('/update', async (req, res) => {
  //   try {
  //     const { name, email, password, firstTime, employmentStatus, challenges, childGender, childCondition } = req.body;

  //     // Check if a user with the provided email already exists
  //     const existingUser = await collection.findOne({ email });

  //     if (existingUser) {
  //       // If user exists, update their information
  //       await collection.updateOne(
  //         { _id: existingUser._id },
  //         { $set: {
  //           name,
  //           email,
  //           password,
  //           parents: {
  //             firstTime: firstTime,
  //             employmentStatus: employmentStatus,
  //             challenges: challenges
  //           },
  //           child: {
  //             gender: childGender,
  //             condition: childCondition
  //           }
  //         }}
  //       );
  //       console.log("User updated:", existingUser._id);
  //     } else {
  //       // If user doesn't exist, create a new user with an auto-incremented ID
  //       const lastUser = await collection.find().sort({ id: -1 }).limit(1).toArray();
  //       const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1; // Auto-increment ID

  //       await collection.insertOne({
  //         id: newId,
  //         name,
  //         email,
  //         password, 
  //         parents: {
  //           firstTime: firstTime,
  //           employmentStatus: employmentStatus,
  //           challenges: challenges
  //         },
  //         child: {
  //           gender: childGender,
  //           condition: childCondition
  //         }
  //       });
  //       console.log("New user created with ID:", newId);
  //     }

  //     res.redirect('/profile.html'); // Redirect to the profile page after submission
  //   } catch (error) {
  //     console.error("Failed to submit data", error);
  //     res.status(500).send("Error submitting data");
  //   }
  // });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main().catch(console.error);
