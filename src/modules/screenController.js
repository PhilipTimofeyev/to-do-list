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

function displayUpdatedTask(task) {
  	const oldTaskElement = document.querySelector(`[data-id="${taskForm.dataset.taskId}"]`)
  	const newTaskElement = setupTemplate(task)
  	taskContainer.replaceChild(newTaskElement, oldTaskElement);
}

function displayAllTasks() {
	tasks.list.forEach((task) => {
  	const newTaskElement = setupTemplate(task)
  	taskContainer.appendChild(newTaskElement);
	})
}

// Misc Functions (Add to seperate module)
	
function removeTaskElement(id) {
	let taskToDelete = document.querySelector(`[data-id="${id}"]`)
	taskToDelete.remove()
}

function setupTemplate(task) {
	console.log(task)
	let temp = document.getElementById("task-template");
	let taskTemp = temp.content.cloneNode(true);
	let deleteTaskBtn = taskTemp.getElementById('deleteTaskBtn')
	let updateTaskBtn = taskTemp.getElementById('updateTaskBtn')

	let title = taskTemp.getElementById('task-title')
	let description = taskTemp.getElementById('task-description')
	let date = taskTemp.getElementById('task-date')
	let priority = taskTemp.getElementById('task-priority')


	deleteTaskBtn.addEventListener("click", function() {
		tasks.deleteTask(task.id)
		removeTaskElement(task.id)
		resetTaskIds() 
	});

	updateTaskBtn.addEventListener("click", function() {
		taskForm.dataset.action = "update";
		taskForm.dataset.taskId = task.id;
		taskForm.showModal();
	});

	taskTemp.firstElementChild.setAttribute('data-id', task.id)

	title.innerText = task.title
	description.innerText = task.description
	date.innerText = task.date.toDateString()
	priority.innerText = task.priority

	return taskTemp
}

function resetTaskIds() {
	tasks.list.forEach((task, idx) => {
		const newId = idx + 1
		const taskElement = document.querySelector(`[data-id="${task.id}"]`)

		taskElement.setAttribute('data-id', newId)
		task.id = newId
	})
}

function modalAddTask(responseArr) {
	let listSize = tasks.list.length + 1
	let newTask = tasks.addTask(...responseArr, listSize);
	displayNewTask(newTask)
}

function modalUpdateTask(responseArr, taskForm) {
	const task = tasks.findTask(taskForm.dataset.taskId)
	task.updateTask(...responseArr)
	displayUpdatedTask(task) 
}


// Extract to Modal Form Module

const taskForm = document.getElementById("taskForm");
const selectFormInputs = taskForm.querySelectorAll(".formInput");
const confirmBtn = taskForm.querySelector("#confirmBtn");
const cancelButton = document.getElementById("cancelBtn");

addTaskBtn.addEventListener("click", () => {
	taskForm.dataset.action = "add"
  taskForm.showModal();
});

taskForm.addEventListener("close", (e) => {
	const cancelButton = document.getElementById("cancelBtn");
	const responseArr = Array.from(selectFormInputs).map((el) => {
		if (el.valueAsDate) {
			return el.valueAsDate
		}
		return el.value
	})

	console.log(responseArr)

	if (taskForm.dataset.action === 'add') {
		modalAddTask(responseArr)
	} else {
		modalUpdateTask(responseArr, taskForm)
	}

});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  taskForm.close(); 
});

// Form cancel button closes the dialog box
// cancelButton.addEventListener("click", () => {
// 	// console.log("LOL")
// 	event.preventDefault();
// 	taskForm.close(); 
// });

displayAllTasks()

export {displayApp};