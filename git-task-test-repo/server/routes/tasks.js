// server/routes/tasks.js
// Routes for task management — intentionally peppered with comments for extraction

const express = require('express');
const router = express.Router();
const db = require('../db/mockDb');

// GET /api/tasks
// FIXME: pagination not implemented (risks OOM on large datasets)
router.get('/', (req, res) => {
  
  const tasks = db.getTasks();
  res.json(tasks);
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    // NOTE: client should validate title, and this is just a
    return res.status(400).json({ error: 'title required' });
  }

  const task = db.createTask({ title, description });
  // TODO: emit event for task.created -> wire to real queue laters
  res.status(201).json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  // TODO: proper auth/ownership validation
  const ok = db.deleteTask(id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

module.exports = router;
