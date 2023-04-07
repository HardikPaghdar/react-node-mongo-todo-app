const express = require('express');
const authRoutes = require('./auth');
const todoRoutes = require('./todo');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Success' });
});

// all routes
router.use('/api/auth', authRoutes);
router.use('/api/todo', todoRoutes);


module.exports = router;
