# Teacher Profile Web Application

This project is a simple web application that allows users to view and interact with teacher profiles. It is built using the MERN stack (MongoDB, Express.js, Node.js, and EJS for templating) with a focus on a responsive interface.

## Project Setup

Follow the steps below to set up and run the project on your local machine.

### 1. Clone the Repository
If you haven't already cloned the repository, do so by running:
# for installation of all node modules needed
npm install
npm install nodemon --save-dev
# Configure the .env File
MONGO_URI=mongodb://127.0.0.1:27017/teacher-profile  # MongoDB connection URI
PORT=5000  # The port your server will run on
SECRET_KEY=mysecretkey  # Secret key for encryption or authentication 

# for storing dummy data in mongo
node seed.js

# cd backend
node server.js or nodemon server.js ->for running your application on port 5000



 
 
