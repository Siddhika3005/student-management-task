const Task = require('../models/Task')

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body

    const task = await Task.create({
      title,
      description,
      status,
      createdBy: req.user._id,
    })

    res.status(201).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

const getTasks = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { createdBy: req.user._id }
    const tasks = await Task.find(query).sort({ createdAt: -1 })

    res.status(200).json({ success: true, data: tasks })
  } catch (error) {
    next(error)
  }
}

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    res.status(200).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    const updatableFields = ['title', 'description', 'status']
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field]
      }
    })

    const updatedTask = await task.save()

    res.status(200).json({ success: true, data: updatedTask })
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    await task.deleteOne()

    res.status(200).json({ success: true, message: 'Task deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
}
