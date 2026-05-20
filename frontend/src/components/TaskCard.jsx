const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <article className="task-card">
      <div className="task-card__header">
        <h3>{task.title}</h3>
        <span className={`status status--${task.status}`}>{task.status}</span>
      </div>
      {task.description && <p className="task-card__body">{task.description}</p>}
      <div className="task-card__footer">
        <button type="button" className="btn btn--ghost" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="btn btn--danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
