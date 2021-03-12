import './TaskItem.css';

const TaskItem = ({ name, onDeleteClick, onDoneClick,
    onImportantClick, done, important }) => {

    let classNames = 'task-item';
    if (done) {
        classNames += ' done';
    };
    if (important) {
        classNames += ' important';
    };

    return (
        <span className={classNames}>
            <span
                className='task-item-name'
                onClick={onDoneClick}>
                {name}
            </span>

            <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onImportantClick}>
                <i className="fa fa-exclamation" />
            </button>

            <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleteClick}>
                <i className="fa fa-trash-o" />
            </button>
        </span>
    );
};

export default TaskItem;
