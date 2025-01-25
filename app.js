const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.static('public')); // Serve static files
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,
});
const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/forgot-password', (req, res) => res.render('forgotPassword'));

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.redirect('/');
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.cookie('token', token, { httpOnly: true });
    res.send('Login successful! Redirecting...');
});

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) console.error(error);
        res.send('Password reset email sent');
    });
});

// Password Reset Page
app.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).send('Invalid token');

        res.render('resetPassword', { email: user.email });
    } catch (error) {
        res.status(400).send('Invalid or expired token');
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
