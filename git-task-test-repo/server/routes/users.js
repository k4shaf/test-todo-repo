// server/routes/users.js
// Simple users endpoints

const express = require('express');
const router = express.Router();
const db = require('../db/mockDb');

// GET /api/users
router.get('/', (req, res) => {
  res.json(db.getUsers());
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = db.getUser(req.params.id);
  if (!user) {
    // FIXME: return standardized error object
    return res.status(404).json({ error: 'user not found' });
  }
  res.json(user);
});

module.exports = router;
