const mongoose = require('mongoose');
const Teacher = require('./backend/models/teacher');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const teachers = [
      {
        name: 'John Doe',
        subject: 'Mathematics',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        profilePicture: 'https://via.placeholder.com/150',
        bio: 'Experienced Math teacher with a passion for problem-solving.',
        experience: '10 years',
        classesHandled: ['Class 10', 'Class 12']
      },
      {
        name: 'Jane Smith',
        subject: 'English',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        profilePicture: 'https://via.placeholder.com/150',
        bio: 'Specialist in English literature and creative writing.',
        experience: '8 years',
        classesHandled: ['Class 9', 'Class 11']
      }
    ];

    await Teacher.insertMany(teachers);
    console.log('Data seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
