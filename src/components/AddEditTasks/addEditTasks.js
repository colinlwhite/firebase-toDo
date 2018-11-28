import $ from 'jquery';
import tasksData from '../../helpers/Data/tasksData';
import initializeTasksPage from '../tasksPage/tasksPage';
import authHelpers from '../../helpers/authHelpers';

const formBuilder = (theTask) => {
  const form = `
    <div class="form-group">
        <label for="task-title">Task:</label>
        <input type="text" class="form-control" value="${theTask.task}" id="task-title" placeholder="Add a New Task">
  </div>
  <div class="form-group">
        <label for="complete">Completed</label>
        <input type="checkbox" class="form-control" value="${theTask.isCompleted}" id="complete">
  </div> 
  `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    isCompleted: false,
    task: $('#task-title').val(),
    uid: authHelpers.getCurrentUid(),
  };
  return task;
};

const buildNewTaskForm = () => {
  const emptyTask = {
    task: '',
  };
  let domString = '<h1>Add New Task</h1>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add-task" class="btn btn-primary">Save New Task</button>';
  $('#create-new-task').html(domString).show();
  $('#tasks').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#create-new-task').html('').hide();
      $('#tasks').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.log('error', error);
    });
};

$('body').on('click', '#add-task', addNewTask);

export default buildNewTaskForm;
