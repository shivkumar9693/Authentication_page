require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const app = express();
//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Routes
// Home route
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/forgot-password', (req, res) => res.render('forgot-password'));

// Signup logic
app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.send('Passwords do not match.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('Email already exists.');

    const user = new User({ email, password });
    await user.save();
    res.redirect('/login');
});

// Login logic
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.send('Invalid email or password.');
    }
    res.send('Login successful!');
});

// Forgot Password logic
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send('Email not found.');
    res.send('Password reset link has been sent to your email.');
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
