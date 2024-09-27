const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();
const path = require('path');

const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(bodyParser.json());

const session = require('express-session');


app.use(session({
  secret: 't88-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Initialize OpenAI client
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("EmpathInteract");
  const collection = db.collection("users");

  // Serve HTML Pages
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
  app.get('/chatbot', (req, res) => res.sendFile(path.join(__dirname, 'chatbot.html')));
  app.get('/summary', (req, res) => res.sendFile(path.join(__dirname, 'summary.html')));
  app.get('/profile.html', (req, res) => res.sendFile(path.join(__dirname, 'profile.html')));
  app.get('/newAccount.html', (req, res) => res.sendFile(path.join(__dirname, 'newAccount.html')));

  // Serve the flashcard HTML files
  app.get('/knowledge-base', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
  app.get('/autism', (req, res) => res.sendFile(path.join(__dirname, 'public', 'autism.html')));
  app.get('/adhd', (req, res) => res.sendFile(path.join(__dirname, 'public', 'adhd.html')));
  app.get('/mental-health-autism', (req, res) => res.sendFile(path.join(__dirname, 'public', 'mental-health-autism.html')));
  app.get('/mental-health-adhd', (req, res) => res.sendFile(path.join(__dirname, 'public', 'mental-health-adhd.html')));
  app.get('/signs-autism', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signs-autism.html')));
  app.get('/signs-adhd', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signs-adhd.html')));
  app.get('/tips-autism', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tips-autism.html')));
  app.get('/tips-adhd', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tips-adhd.html')));

  // Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const userInput = req.body.message;
      if (!userInput) {
        return res.status(400).json({ error: 'No input provided' });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant providing strategies for parents with special needs children." },
          { role: "user", content: userInput }
        ],
      });

      const chatResponse = completion.choices[0].message.content;
      res.json({ response: chatResponse });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: `An error occurred on the server: ${error.message}` });
    }
  });

  app.post('/api/summarize', async (req, res) => {
    try {
      const { userId, chatHistory } = req.body;
      const chatText = chatHistory.map(entry => `${entry.role === 'user' ? 'User' : 'GPT'}: ${entry.content}`).join('\n');
  
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant that summarizes conversations into their respective problem and strategies to counter the problem in a concise manner." },
            { role: "user", content: `Summarize the following chat: \n\n${chatText}` }
        ],
    });

    const summaryResponse = completion.choices[0].message.content;
    console.log('OpenAI response:', summaryResponse);

    const problemMatch = summaryResponse.match(/\*\*Problems Identified:\*\*([\s\S]*?)(?:\*\*Strategies to Counter Problems:|\n\*\*Strategy)/);
    const strategyMatch = summaryResponse.match(/\*\*Strategies to Counter Problems:\*\*([\s\S]*)/);

    const problem = problemMatch ? problemMatch[1].trim() : "Problem summary not found.";
    const strategy = strategyMatch ? strategyMatch[1].trim() : "Strategy summary not found.";
  
      const objectId = new ObjectId(userId);
      const existingUser = await collection.findOne({ _id: objectId });
  
      if (!existingUser) {
        console.error("User not found with id:", userId);
        return res.status(404).json({ error: "User not found" });
      }
  
      console.log("User found:", existingUser);
      const updateResult = await collection.updateOne(
        { _id: existingUser._id },
        { $set: { summary: {
          problem: problemMatch,
          strategy: strategyMatch
        } } }
      );
  
      if (updateResult.modifiedCount !== 1) {
        console.error("Failed to update profile for user:", existingUser._id);
        return res.status(500).json({ error: "Error updating profile. Please try again." });
      }
  
      console.log("User profile updated:", existingUser._id);
      res.json({ problem, strategy });
  
    } catch (error) {
      console.error('Error summarizing chat:', error);
      return res.status(500).json({ error: 'Failed to summarize the chat.' });
    }
  });
  


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
        return res.status(400).send('<script>alert("Email already exists. Use a different email!"); window.location.href = "/newAccount.html";</script>');
      }
  
      // Generate new user ID (auto-increment)
      const lastUser = await collection.find().sort({ id: -1 }).limit(1).toArray();
      const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1; // Auto-increment ID
  
      // Insert the new user
      const result = await collection.insertOne({
        id: newId,
        email,
        password,
      });
  
      // Store user ID in session
      req.session.userId = result.insertedId; 
  
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
      const { userId, name, firstTime, employmentStatus, challenges, childGender, childCondition } = req.body;
      const objectId = new ObjectId(userId);
      const existingUser = await collection.findOne({ _id: objectId });
  
      if (existingUser) {
        const updateResult = await collection.updateOne(
          { _id: existingUser._id },
          {
            $set: {
              name,
              parents: {
                firstTime,
                employmentStatus,
                challenges
              },
              child: {
                gender: childGender,
                condition: childCondition
              }
            }
          }
        );
  
        if (updateResult.modifiedCount === 1) {
          return res.redirect('/profile.html');
        } else {
          return res.status(400).send("No changes made to the user profile");
        }
      } else {
        return res.status(404).send("User not found");
      }
    } catch (error) {
      return res.status(500).send("Error updating user profile");
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
