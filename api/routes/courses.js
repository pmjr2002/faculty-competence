const express = require('express');

const router = express.Router();
const Course = require('../models').Course;
const User = require('../models').User;
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');

// Return all courses
router.get('/courses', asyncHandler(async (req, res) => {
  let courses = await Course.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: {
      model: User,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  });
  res.json(courses);
}));

// Return a specific course
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: {
      model: User,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  });
  if (course) {
    res.json(course);
  } else {
    res.json({
      "error": "Sorry, we couldn't find the course you were looking for."
    });
  }
}));

// Create a course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201)
      .location(`/courses/${newCourse.dataValues.id}`)
      .end();
  } catch (error) {
    console.log('ERROR: ', error.name);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

// Update an existing course
router.put("/courses/:id", authenticateUser, asyncHandler(async (req, res, next) => {
  const user = req.currentUser;
  let course;
  try {
    course = await Course.findByPk(req.params.id);
    if (course) {
      if (course.userId === user.id) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ error: 'You are not authorised to update this course.' });
      }
    } else {
      const err = new Error(`Course Not Found`);
      res.status(404).json({ error: err.message });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

// Delete an existing course
router.delete("/courses/:id", authenticateUser, asyncHandler(async (req, res, next) => {
  const user = req.currentUser;
  const course = await Course.findByPk(req.params.id);
  if (course) {
    if (course.userId === user.id) {
      await course.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({ error: 'You are not authorised to delete this course.' });
    }
  } else {
    const err = new Error(`Course Not Found`);
    res.status(404).json({ error: err.message });
  }
}));


// Count the total number of courses for a specific user
router.get('/users/:id/course-count', authenticateUser, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);
  
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the authenticated user is the same as the user whose course count we're retrieving
    if (req.currentUser.id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to view this user\'s course count' });
    }

    const courseCount = await Course.count({
      where: {
        userId: userId
      }
    });

    res.json({ courseCount });
  } catch (error) {
    console.error('Error retrieving course count:', error);
    res.status(500).json({ error: 'Server error' });
  }
}));


module.exports = router;

