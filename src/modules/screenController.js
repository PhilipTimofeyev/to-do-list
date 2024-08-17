import {tasks} from "./taskList.js"

// DOM Elements
const taskContainer = document.getElementById('tasks-container')

// Buttons
const addTaskBtn = document.getElementById('addTaskBtn')

function displayApp() {
}

function displayNewTask(task) {
  	const newTaskElement = setupTemplate(task)
  	taskContainer.appendChild(newTaskElement);
}

function displayAllTasks() {
	tasks.list.forEach((task) => {
  	const newTaskElement = setupTemplate(task)
  	taskContainer.appendChild(newTaskElement);
	})
}

// Misc Functions (Add to sepearte module)
	
	function removeTask(id) {
		let taskToDelete = document.querySelector(`[data-id="${id}"]`)
		taskToDelete.remove()
	}

	function setupTemplate(task) {
		let temp = document.getElementById("task-template");
		let taskTemp = temp.content.cloneNode(true);
		let deleteTaskBtn = taskTemp.getElementById('deleteTaskBtn')

		let title = taskTemp.getElementById('task-title')
		let description = taskTemp.getElementById('task-description')
		let date = taskTemp.getElementById('task-date')


		deleteTaskBtn.addEventListener("click", function() {
			tasks.deleteTask(task.id)
			removeTask(task.id)
		});

		taskTemp.firstElementChild.setAttribute('data-id', task.id)

		title.innerText = task.title
		description.innerText = task.description
		date.innerText = task.date.toDateString()

		return taskTemp
	}


// Extract to Modal Form Module

const showButton = document.getElementById("showDialog");
const taskForm = document.getElementById("taskForm");
const outputBox = document.querySelector("output");
const selectFormInputs = taskForm.querySelectorAll(".formInput");
const confirmBtn = taskForm.querySelector("#confirmBtn");

addTaskBtn.addEventListener("click", () => {
  taskForm.showModal();
});

taskForm.addEventListener("close", (e) => {
	const responseArr = Array.from(selectFormInputs).map((el) => {
		if (el.valueAsDate) {
			return el.valueAsDate
		}
		return el.value
	})

	let listSize = tasks.list.length + 1
	let newTask = tasks.addTask(...responseArr, listSize);
	displayNewTask(newTask)

});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  taskForm.close(selectFormInputs.value); 
});

displayAllTasks()

export {displayApp};