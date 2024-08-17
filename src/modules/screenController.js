import {tasks} from "./taskList.js"

// DOM Elements
const taskContainer = document.getElementById('tasks-container')

// Buttons
const addTaskBtn = document.getElementById('addTaskBtn')


console.log(addTaskBtn)
// Event Listeners
addTaskBtn.addEventListener("click", function() {
	let listSize = tasks.list.length + 1
	let newTask = tasks.addTask("Hello", "I am a task", listSize);
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
  	let deleteTaskBtn = taskTemp.getElementById('deleteTaskBtn')

  	deleteTaskBtn.addEventListener("click", function() {
  		tasks.deleteTask(task.id)
  		removeTask(task.id)
  	});

  	taskTemp.firstElementChild.setAttribute('data-id', task.id)

  	title.innerText = task.title
  	description.innerText = task.description
  	taskContainer.appendChild(taskTemp);
}

function displayAllTasks() {
	tasks.list.forEach((task) => {
  	let temp = document.getElementById("task-template");
  	let taskTemp = temp.content.cloneNode(true);

  	let deleteTaskBtn = taskTemp.getElementById('deleteTaskBtn')

  	deleteTaskBtn.addEventListener("click", function() {
  		tasks.deleteTask(task.id)
  		removeTask(task.id)
  		console.log(tasks.list)
  	});

  	taskTemp.firstElementChild.setAttribute('data-id', task.id)

  	let title = taskTemp.getElementById('task-title')
  	let description = taskTemp.getElementById('task-description')

  	title.innerText = task.title
  	description.innerText = task.description
  	taskContainer.appendChild(taskTemp);
	})
}

// Misc Functions (Add to sepearte module)
	
	function removeTask(id) {
		let taskToDelete = document.querySelector(`[data-id="${id}"]`)
		taskToDelete.remove()
	}

// 

displayAllTasks()

export {displayApp};