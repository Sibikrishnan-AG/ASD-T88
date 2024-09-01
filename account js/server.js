// This works email and password saved on db for now...
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Express App Setup
const app = express();
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve Static Files
app.use(express.static(__dirname));

// MongoDB Connection
// On MongoDB Atlas:
// Step 1: Click connect
// Step 2: Choose Drivers
// Step 3: Choose node.js driver, install the driver, add the string to server.js (remember to indicate db name)
const mongoUri = 'mongodb+srv://t88kaijun:t88password@cluster0.2f5em.mongodb.net/e?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
}, {
    collection: 'user' // Specify the existing collection at 'e' database
});

const User = mongoose.model('User', userSchema);

// Route to Handle Form Submission
app.post('/submit', (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        // Redirect back to the form with an error message
        res.status(400).send('<script>alert("Passwords do not match."); window.location.href = "/newAccount.html";</script>');
    } else {
        const newUser = new User({
            email,
            password,
        });

        newUser.save()
            .then(() => {
                console.log('User saved to database!');
                res.redirect('/createProfile.html'); // Redirect to createProfile.html
            })
            .catch(err => {
                console.error('Error saving user:', err); // Log the specific error
                res.status(500).send('Error saving user');
            });
    }
});

// Serve account.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'newAccount.html'));
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
