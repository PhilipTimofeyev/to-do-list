import {Task} from "./task.js"

export class Project {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		// this.list = [new Task("First Task", "Task Description", new Date("2/1/22"), "High", 1), new Task("Second Task", "Task Description", new Date("3/1/23"), "Low", 2)]
		this.list = []
	}

	addTask(title, description, date, priority, id) {
		let newTask = new Task(title, description, date, priority, id)
		this.list.push(newTask)
		return newTask
	}

	deleteTask(id) {
		this.list = this.list.filter((task) => task.id != id)
	}

	findTask(id) {
		return this.list.find((task) => task.id == id)
	}
}

class Projects {
	constructor(id) {
		this.list = [];
	}

	addProject(name, id) {
		let newProject = new Project(name, id)
		this.list.push(newProject)
		return newProject
	}

	deleteProject(id) {
		this.list = this.list.filter((project) => project.id != id)
	}

	findProject(id) {
		return this.list.find((project) => project.id == id)
	}
}

export function resetProjectIds() {
	projects.list.forEach((project, idx) => {
		const newId = idx + 1
		const projectElement = document.querySelector(`[data-id="${project.id}"]`)

		projectElement.setAttribute('data-id', newId)
		project.id = newId
	})
}

export function clearBackground() {
	let li = document.querySelectorAll("li")

	li.forEach((el)=> {
		el.style.background = `rgba(54, 119, 224, .3)`
	})
}


const projects = new Projects


export {projects};