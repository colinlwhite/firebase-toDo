import $ from 'jquery';
import tasksData from '../../helpers/Data/tasksData';
import initializeTasksPage from '../tasksPage/tasksPage';
import authHelpers from '../../helpers/authHelpers';

// Form to Create and Edit/Update a Task
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

// Creating task object to grab the user's 'task' from the form
const gettingTaskFromForm = () => {
  const task = {
    task: $('#task-title').val(),
    isCompleted: false,
    uid: authHelpers.getCurrentUid(),
  };
  return task;
};

const buildNewTaskForm = () => {
  // Creating an empty string to set to the form
  const emptyTask = {
    task: '',
  };
  // Building a DOM string to print to the page when the user wants to add a new task
  let domString = '<h1>Add New Task</h1>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add-task" class="btn btn-primary">Add New Task</button>';
  // The id lives on index.html and is set to display: none
  // We're giving it HTML and showing the hidden page/div
  $('#create-new-task').html(domString).show();
  // Hiding the tasks div that automatically shows
  $('#tasks').hide();
  $('#completed-tasks').hide();
};

// Post Data Call and refreshing the DOM
const addNewTask = () => {
  // The user's 'task' from the form
  const newTask = gettingTaskFromForm();
  // Axios post to add the 'task' to Firebase
  tasksData.addNewTask(newTask)
    .then(() => {
      // Hiding 'Add New Task' Page
      $('#create-new-task').html('').hide();
      // Showing default homepage of 'task'
      $('#tasks').show();
      $('#completed-tasks').show();
      // Navigation bar and 'Add Task' button which calls buildNewTaskForm above
      initializeTasksPage();
    })
    .catch((error) => {
      console.log('error', error);
    });
};


// Edit the Task Called on Edit Button on Card
const showEditForm = (e) => {
  // Grabbing the ID from the Button
  const idToEdit = e.target.dataset.editId;
  // Axios get to get one task
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      // Building a DOM string to print to the page when the user wants to edit a task
      let domString = '<h1>Update Task</h1>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id}>Update Task</button>`;
      // The id lives on index.html and is set to display: none
      // We're giving it HTML and showing the hidden page/div
      $('#create-new-task').html(domString).show();
      // Hiding the tasks div that automatically shows
      $('#tasks').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};


// Put Data Call and refreshing the DOM
const updateTask = (e) => {
  // The user's updated 'task' from the form
  const updatedTask = gettingTaskFromForm();
  // Grabbing the ID from the button
  const taskId = e.target.dataset.singleEditId;
  // Axios PUT call
  tasksData.updateTask(updatedTask, taskId)
    .then(() => {
      // Hiding 'Add New Task' Page
      $('#create-new-task').html('').hide();
      // Showing default homepage of 'task'
      $('#tasks').show();
      // Navigation bar and 'Add Task' button which calls buildNewTaskForm above
      initializeTasksPage();
    });
};

// Click Events
$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);

export default buildNewTaskForm;
