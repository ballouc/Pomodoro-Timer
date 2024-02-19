import { useEffect, useState } from 'react'
import Task from './Task';

interface Task{
  taskValue: string;
  taskKey: string;
  isComplete: boolean;
  isOpen: boolean;
}

const TaskList = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task>(tasks[0]);

  // **** LocalStorage ****
  // Load from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      // Parse the stored tasks string back to an array of objects
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save to localStorage (whenever state changes)
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  // **** End LocalStorage ****

  // note for later, create a TaskPrompt component which will be rendered when this is called.
  function taskPrompt() {
    let taskPrompt = prompt("Enter task name", "");
    // The replace function prevents a user from adding ' ' as a task.
    if(taskPrompt?.replace(/\s/,'')){
      addTask(taskPrompt);
    }
  }

  function getTaskKey(task: string){
    // Use regex to replace any non alphanumeric characters with '' and any spaces with '-'
    let taskKey:string = task.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replace(/\s+/g, '-');
    // This trims any hanging hyphens, could maybe trim this line but it reduces clarity further.
    taskKey = taskKey.replace(/-+$/, '');
    return taskKey;
  }

  const handleDeleteTask = (taskKeyToDelete: string) => {
    let newTasks = tasks.filter(task => task.taskKey !== taskKeyToDelete);
    setTasks(newTasks);
  }

  // Function to handle when a task's value changes via options menu.
  const handleSaveOptions = (newTaskValue: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.taskKey === currentTask.taskKey) {
        return { ...task, taskValue: newTaskValue, taskKey: getTaskKey(newTaskValue), isOpen: false };
      }
      return task;
    });
    setTasks(updatedTasks);
    setOptionsOpen(false);
  }

  const handleOpenOptions = (task: Task) => {
    task.isOpen = !task.isOpen;
    setOptionsOpen(!optionsOpen);
  }

  function addTask (taskPrompt: string) {
      const taskKey = getTaskKey(taskPrompt);
      if (tasks.length === 0){
        setTasks([{ taskValue: taskPrompt, taskKey: taskKey, isComplete: false, isOpen: false }])
      } else {
        setTasks([...tasks, { taskValue: taskPrompt, taskKey: taskKey, isComplete: false, isOpen: false }]);
      }
  }

  // Function to handle the selection of each task
  // The 'completeness' of each task was moved here as opposed to the 
  // individual Task components so that the incomplete tasks could bubble to the
  // top of the list.
  const handleToggleComplete = (taskKey: string) => {
    const newTasks = tasks.map(task => {
      if (task.taskKey === taskKey) {
        return {...task, isComplete: !task.isComplete};
      }
      return task;
    });

    // Creating 2 new lists of complete and incomplete
    const completeTasks = newTasks.filter(task => task.isComplete);
    const incompleteTasks = newTasks.filter(task => !task.isComplete);
    // And filling the tasks state obj with them, in order
    setTasks([...completeTasks, ...incompleteTasks])
  }

  return (
    <div className="tasklist-container">
      {!optionsOpen ? (
        <>
          {/* Render incomplete tasks first */}
          {tasks.map((task) => {
            const taskKey = getTaskKey(task.taskValue);
            if (!task.isComplete) {
              return (
                <Task
                  key={taskKey}
                  taskKey={taskKey}
                  taskValue={task.taskValue}
                  isComplete={task.isComplete}
                  onOpenOptions={() => {
                    handleOpenOptions(task);
                    setCurrentTask(task);
                  }}
                  isOpen={false}
                  onToggleComplete={() => handleToggleComplete(taskKey)}
                />
              );
            }
            return null;
          })}
          {/* Render complete tasks at the end */}
          {tasks.map((task) => {
            const taskKey = getTaskKey(task.taskValue);
            if (task.isComplete) {
              return (
                <Task
                  key={taskKey}
                  taskKey={taskKey}
                  taskValue={task.taskValue}
                  isComplete={task.isComplete}
                  onOpenOptions={() => {
                    handleOpenOptions(task);
                    setCurrentTask(task);
                  }}
                  isOpen={false}
                  onToggleComplete={() => handleToggleComplete(taskKey)}
                />
              );
            }
            return null;
          })}
          <button className="large-btn" id="add-task-btn" onClick={taskPrompt}>ADD NEW TASK</button>
        </>
      ) : (
        <>
          <form id="options-form" >
            <input 
              id="options-text-input"
              type="text"
              value={currentTask.taskValue}
              onChange={(event) => setCurrentTask({ ...currentTask, taskValue: event.target.value })}
              required/>
              <div id="options-btns-container">
                <button 
                  id="options-save-btn"
                  className="options-btn large-btn"
                  onClick={() => handleSaveOptions((document.getElementById('options-text-input') as HTMLInputElement)?.value || '')}>OK
                </button>
                <button 
                  id="options-delete-btn"
                  className="options-btn large-btn"
                  onClick={() => {
                    handleDeleteTask(currentTask.taskKey);
                    setOptionsOpen(false);
                  }}>Delete
                </button>
              </div>
          </form>
        </>
      )}
    </div>
  )
}

export default TaskList