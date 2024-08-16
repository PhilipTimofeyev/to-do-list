import {tasks} from "./taskList.js"

// DOM Elements
const taskContainer = document.getElementById('tasks-container')

// Buttons
const addTaskBtn = document.getElementById('addTaskBtn')


// Event Listeners
	addTaskBtn.addEventListener("click", function() {
		let newTask = tasks.addTask("Hello", "I am a task");
		displayNewTask(newTask)
	});

// 

function displayApp() {
}

function displayNewTask(task) {
  	let temp = document.getElementById("task-template");
  	let taskTemp = temp.content.cloneNode(true);

  	let title = taskTemp.getElementById('task-title')
  	let description = taskTemp.getElementById('task-description')

  	title.innerText = task.title
  	description.innerText = task.description
  	taskContainer.appendChild(taskTemp);
}

function displayAllTasks() {
	tasks.list.forEach((task) => {
  	let temp = document.getElementById("task-template");
  	let taskTemp = temp.content.cloneNode(true);

  	let title = taskTemp.getElementById('task-title')
  	let description = taskTemp.getElementById('task-description')

  	title.innerText = task.title
  	description.innerText = task.description
  	taskContainer.appendChild(taskTemp);
	})
}


displayAllTasks()

export {displayApp};