import { projects, clearBackground } from "./projects.js"
import { setupTaskTemplate, updatedTaskCount, clearForm } from "./helpers.js"
const dateFns = require("date-fns");

// Global

let workingProject

// DOM Elements
const projectsContainer = document.getElementById('projects-container')
const taskContainer = document.getElementById('tasks-container')
const projectsCountEl = document.getElementById('projects-count')

// Buttons
const addProjectBtn = document.getElementById('addProjectBtn')

// Display
function displayApp() {
}

function displayNewTask(task, project) {
  	const newTaskElement = setupTaskTemplate(task, project)
  	taskContainer.appendChild(newTaskElement);
	updatedTaskCount(project)
}

function displayUpdatedTask(task, project) {
  	const oldTaskElement = document.querySelector(`[data-task-id="${taskForm.dataset.taskId}"]`)
  	const newTaskElement = setupTaskTemplate(task, project)
  	taskContainer.replaceChild(newTaskElement, oldTaskElement);
}

function displayProject(project) {
	removeChildren()
	project.list.forEach((task) => {
		const newTaskElement = setupTaskTemplate(task, project)
		taskContainer.appendChild(newTaskElement);
	})
}

function removeChildren() {
	while (taskContainer.firstChild) { 
	    taskContainer.firstChild.remove(); 
	}
}

function displayNewProject(project) {
	const newProjectElement = setupProjectTemplate(project)
	projectsContainer.appendChild(newProjectElement);
	projectsCountEl.innerText = `Projects (${projects.count()})`
}

function removeProjectElement(id) {
	let projectToDelete = document.querySelector(`[data-id="${id}"]`)
	projectsCountEl.innerText = `Projects (${projects.count()})`
	projectToDelete.remove()
}


// Projects

function createProject(projectName) {
	let listSize = projects.list.length + 1
	let newProject = projects.addProject(projectName, listSize)
	displayNewProject(newProject)
}

(function addProject() {
	const projectTitleInput = document.getElementById("projectTitleInput");
	let projectName

	projectTitleInput.addEventListener("input", updateValue);

	function updateValue(e) {
	  projectName = e.target.value;
	}

	function clearProjectTitleInput() {
		projectTitleInput.value = ''
	}

	addProjectBtn.addEventListener('click', function() {
		const titleValidity = projectTitleInput.checkValidity()
		if (titleValidity) {
			createProject(projectName)
			clearProjectTitleInput()
		}
	})
})()

function setupProjectTemplate(project) {
	let temp = document.getElementById("project-template");
	let projectTemp = temp.content.cloneNode(true);
	let deleteProjectBtn = projectTemp.getElementById('deleteProjectBtn')
	const addTaskBtn = projectTemp.getElementById('addTaskBtn')
	let showProjectLi = projectTemp.getElementById('showProjectLi')

	let projectName = projectTemp.getElementById('project-name')

	deleteProjectBtn.addEventListener("click", function() {
		projects.deleteProject(project.id)
		removeProjectElement(project.id)
		projects.resetProjectIds() 
	});

	addTaskBtn.addEventListener("click", () => {
		taskForm.dataset.action = "add";
		clearForm()
	  taskForm.showModal();
	  workingProject = project
	});

	showProjectLi.addEventListener("click", function() {
		clearBackground()
		showProjectLi.style.background = 'rgb(102, 51, 153, .9)'
		displayProject(project);
	});


	projectTemp.firstElementChild.setAttribute('data-id', project.id)

	projectName.innerText = project.name

	return projectTemp
}

// Modal

const taskForm = document.getElementById("taskForm");
const form = document.getElementById("form");
const selectFormInputs = taskForm.querySelectorAll(".formInput");
const confirmBtn = taskForm.querySelector("#confirmBtn");
const cancelButton = document.getElementById("cancelBtn");


confirmBtn.addEventListener("click", (event) => {
	if (!form.reportValidity()) return
  	const responseArr = Array.from(selectFormInputs).map((el) => {
		if (el.valueAsDate) {
			let newDate = el.value
			let parsedDate = dateFns.parse(newDate, 'yyyy-MM-dd', new Date());
			return parsedDate
		}
			console.log(String(el.value))
  		return String(el.value)
  	})

  if (taskForm.dataset.action === 'add') {
  	modalAddTask(responseArr, workingProject)
  } else {
  	modalUpdateTask(responseArr, taskForm, workingProject)
  }
  event.preventDefault();
  taskForm.close(); 

});

cancelButton.addEventListener("click", (event) => {
	event.preventDefault();
	taskForm.close(); 
})

function modalAddTask(responseArr, project) {
	let listSize = project.list.length + 1
	let newTask = project.addTask(...responseArr, listSize);
	displayNewTask(newTask, project);
}

function modalUpdateTask(responseArr, taskForm, project) {
	const task = project.findTask(taskForm.dataset.taskId);
	task.updateTask(...responseArr);
	displayUpdatedTask(task, project); 
}

export {displayApp};
