const express = require('express')
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')
const { createTaskValidator, updateTaskValidator } = require('../validators/taskValidator')
const validateRequest = require('../middleware/validateMiddleware')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protect)

router
  .route('/')
  .post(createTaskValidator, validateRequest, createTask)
  .get(getTasks)

router
  .route('/:id')
  .get(getTask)
  .put(updateTaskValidator, validateRequest, updateTask)
  .delete(deleteTask)

module.exports = router
