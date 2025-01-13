require('dotenv').config();
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Teacher = require('./models/teacher');
const teachersRoutes = require('./routes/teachers');
const app = express();

 
const port = process.env.PORT || 5000;

// db connections
main().then(()=>{
  console.log("DB Connnected");
}).catch((er)=>{
  console.log(er);
})
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/teacher-profile");
}
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // static files

// Set EJS as view engine
app.set('view engine', 'ejs');

// Routes for API
app.use('/api/teachers', teachersRoutes);

// Routes for frontend
app.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();  
    res.render('index', { teachers });  
  } catch (error) {
    res.status(500).send('Error fetching teachers: ' + error);
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
