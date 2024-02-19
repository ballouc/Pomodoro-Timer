import React from 'react'

interface Props{
    optionsOpen: boolean;
}

// Come back to this
const TaskOptions: React.FC<Props> = () => {
  return (
    <>
        <div className="tasklist-container">
            Options Menu is Open!
            <button id="delete-task-btn">Delete</button>
        </div>
    </>
  )
}

export default TaskOptions