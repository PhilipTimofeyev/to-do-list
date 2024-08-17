import {tasks} from "./taskList.js"

// DOM Elements
const taskContainer = document.getElementById('tasks-container')

// Buttons
const addTaskBtn = document.getElementById('addTaskBtn')
const deleteTaskBtn = document.getElementById('deleteTaskBtn')


// Event Listeners
addTaskBtn.addEventListener("click", function() {
	let listSize = tasks.list.length + 1
	let newTask = tasks.addTask("Hello", "I am a task", listSize);
	displayNewTask(newTask)
	console.log(newTask.id)
});

// 

function displayApp() {
}

function displayNewTask(task) {
  	let temp = document.getElementById("task-template");
  	let taskTemp = temp.content.cloneNode(true);

  	let title = taskTemp.getElementById('task-title')
  	let description = taskTemp.getElementById('task-description')

  	taskTemp.firstElementChild.setAttribute('data-id', task.id)

  	title.innerText = task.title
  	description.innerText = task.description
  	taskContainer.appendChild(taskTemp);
}

function displayAllTasks() {
	tasks.list.forEach((task) => {
  	let temp = document.getElementById("task-template");
  	let taskTemp = temp.content.cloneNode(true);

  	taskTemp.firstElementChild.setAttribute('data-id', task.id)

  	let title = taskTemp.getElementById('task-title')
  	let description = taskTemp.getElementById('task-description')

  	title.innerText = task.title
  	description.innerText = task.description
  	taskContainer.appendChild(taskTemp);
	})
}

// Misc Functions (Add to sepearte module)

displayAllTasks()

export {displayApp};