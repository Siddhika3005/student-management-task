import { useEffect, useMemo, useState } from 'react'
import api from '../api/axios'
import TaskCard from '../components/TaskCard'

const emptyTask = { title: '', description: '', status: 'pending' }

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [formData, setFormData] = useState(emptyTask)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const statusOptions = useMemo(() => ['pending', 'in-progress', 'completed'], [])

  const fetchTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/tasks')
      setTasks(response.data.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const resetForm = () => {
    setFormData(emptyTask)
    setEditingTaskId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      if (editingTaskId) {
        await api.put(`/tasks/${editingTaskId}`, formData)
      } else {
        await api.post('/tasks', formData)
      }
      resetForm()
      fetchTasks()
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to save task')
    }
  }

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
    })
    setEditingTaskId(task._id)
  }

  const handleDelete = async (taskId) => {
    setError('')
    try {
      await api.delete(`/tasks/${taskId}`)
      fetchTasks()
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to delete task')
    }
  }

  return (
    <section className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Task command center</h1>
          <p>Track focus, progress, and completions in one view.</p>
        </div>
        <div className="dashboard__stats">
          <span>Total tasks</span>
          <strong>{tasks.length}</strong>
        </div>
      </div>

      <div className="dashboard__content">
        <form className="task-form" onSubmit={handleSubmit}>
          <h2>{editingTaskId ? 'Update task' : 'Create a new task'}</h2>
          <div className="task-form__row">
            <label>
              Title
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ship weekly report"
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Add a note or checklist"
              />
            </label>
            <label>
              Status
              <select name="status" value={formData.status} onChange={handleChange}>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {error && <div className="alert alert--error">{error}</div>}
          <div className="task-form__actions">
            <button type="submit" className="btn btn--primary">
              {editingTaskId ? 'Save changes' : 'Add task'}
            </button>
            {editingTaskId && (
              <button type="button" className="btn btn--ghost" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="task-list">
          <div className="task-list__header">
            <h2>Active tasks</h2>
            {loading && <span className="muted">Loading...</span>}
          </div>
          {tasks.length === 0 && !loading ? (
            <div className="empty-state">
              <p>No tasks yet. Create your first one from the form.</p>
            </div>
          ) : (
            <div className="task-grid">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Dashboard
