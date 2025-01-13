const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  email: String,
  phone: String,
  profilePicture:{
    type: String,
    set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1661964320064-ca1bfb994d11?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
  },
  bio: String,
  experience: String,
  classesHandled: [String],
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
