import {Task} from "./task.js"

export class Project {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.list = []
	}

	addTask(title, description, date, priority, id) {
		let newTask = new Task(title, description, date, priority, id)
		this.list.push(newTask)
		return newTask
	}

	deleteAllTasks() {
		this.list = []
	}

	deleteTask(id) {
		this.list = this.list.filter((task) => task.id != id)
	}

	findTask(id) {
		return this.list.find((task) => task.id == id)
	}

	resetTaskIds() {
		this.list.forEach((task, idx) => {
			const newId = idx + 1
			const taskElement = document.querySelector(`[data-task-id="${task.id}"]`)

			taskElement.setAttribute('data-task-id', newId)
			task.id = newId
		})
	}
}

class Projects {
	constructor() {
		this.list = [];
	}

	addProject(name, id) {
		let newProject = new Project(name, id)
		this.list.push(newProject)
		return newProject
	}

	deleteProject(id) {
		const selectedProject = this.list.find(project => project.id === id)
		
		selectedProject.deleteAllTasks()
		this.list = this.list.filter((project) => project.id != id)
	}

	findProject(id) {
		return this.list.find((project) => project.id == id)
	}

	resetProjectIds() {
		this.list.forEach((project, idx) => {
			const newId = idx + 1
			const projectElement = document.querySelector(`[data-id="${project.id}"]`)

			projectElement.setAttribute('data-id', newId)
			project.id = newId
		})
	}

	count() {
		return this.list.length
	}
}

export function clearBackground() {
	let li = document.querySelectorAll("li")

	li.forEach((el)=> {
		el.style.background = `rgba(54, 119, 224, .3)`
	})
}


const projects = new Projects


export {projects};