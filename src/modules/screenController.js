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
		fillForm(task.id); 
		taskForm.showModal();
	});

	taskTemp.firstElementChild.setAttribute('data-id', task.id)

	title.innerText = task.title
	description.innerText = task.description
	date.innerText = task.date
	priority.innerText = task.priority

	return taskTemp
}

function fillForm(taskId) {
	const task = tasks.findTask(taskId)

	const form = document.querySelectorAll(".formInput")
	const formDate = document.getElementById("date")

	form.forEach((input) => {
		let attribute = input.name
		
		input.name === 'date' ? input.value = parseDate(task.date) : input.value = task[attribute]
	})
}

function parseDate(date) {
	if (date === "") return null
	return date.getFullYear().toString().padStart(4, '0') + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
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

confirmBtn.addEventListener("click", (event) => {
  const responseArr = Array.from(selectFormInputs).map((el) => {
  	if (el.valueAsDate) {
  		return new Date(el.value)
  	}
  	return el.value
  })

  if (taskForm.dataset.action === 'add') {
  	modalAddTask(responseArr)
  } else {
  	modalUpdateTask(responseArr, taskForm)
  }
  event.preventDefault();
  taskForm.close(); 

});

displayAllTasks()

export {displayApp};