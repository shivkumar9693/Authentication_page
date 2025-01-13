const express = require('express');
const Teacher = require('../models/teacher');

const router = express.Router();

// GET all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
