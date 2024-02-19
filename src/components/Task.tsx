import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';

interface Props{
    taskValue: string;
    taskKey: string;
    isComplete: boolean;
    isOpen: boolean;
    onOpenOptions : () => void;
    onToggleComplete: () => void;
}

const Task: React.FC<Props> = ( {taskValue, taskKey, isComplete, isOpen, onOpenOptions, onToggleComplete} ) => {

    return (
        <>
            <div className={`task-container ${isComplete ? `complete` : ``} ${isOpen ? `open` : ``}`}>
                <button className={`btn task-complete-btn ${isComplete ? `complete` : ``}`}
                onClick={onToggleComplete}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <div className="task" id={taskKey}>{taskValue}</div>
                <button className="btn task-options-btn"
                onClick={() => onOpenOptions()}>
                    <FontAwesomeIcon icon={faInfo} />
                </button>
            </div>
        </>
    )
}

export default Task