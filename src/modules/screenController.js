import {tasks} from "./taskList.js"

// console.log(tasks.list[0].updateTask("lol", "yes"))

// console.log(tasks)

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
  	console.log(task.date)
  	// console.log(oldTaskElement)
  	// console.log(newTaskElement)
  	taskContainer.replaceChild(newTaskElement, oldTaskElement);
  	// taskContainer.appendChild(newTaskElement);
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
	let temp = document.getElementById("task-template");
	let taskTemp = temp.content.cloneNode(true);
	let deleteTaskBtn = taskTemp.getElementById('deleteTaskBtn')
	let updateTaskBtn = taskTemp.getElementById('updateTaskBtn')

	let title = taskTemp.getElementById('task-title')
	let description = taskTemp.getElementById('task-description')
	let date = taskTemp.getElementById('task-date')


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
	// console.log(task)
	displayUpdatedTask(task) 

	// console.log(responseArr)
}


// Extract to Modal Form Module

const taskForm = document.getElementById("taskForm");
const selectFormInputs = taskForm.querySelectorAll(".formInput");
const confirmBtn = taskForm.querySelector("#confirmBtn");

addTaskBtn.addEventListener("click", () => {
	taskForm.dataset.action = "add"
  taskForm.showModal();
});

taskForm.addEventListener("close", (e) => {
	// console.log(taskForm.dataset.taskId)
	const responseArr = Array.from(selectFormInputs).map((el) => {
		if (el.valueAsDate) {
			return el.valueAsDate
		}
		return el.value
	})

	if (taskForm.dataset.action === 'add') {
		modalAddTask(responseArr)
	} else {
		modalUpdateTask(responseArr, taskForm)
		console.log(responseArr)
	}

});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log(taskForm)
  taskForm.close(); 
});

displayAllTasks()

export {displayApp};