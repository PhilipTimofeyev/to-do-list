import {Task} from "./task.js"

export class Project {
	constructor(id) {
		this.list = [new Task("First Task", "Task Description", new Date("2/1/22"), "High", 1), new Task("Second Task", "Task Description", new Date("3/1/23"), "Low", 2)]
		this.id = id;
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


const tasks = new Project(1)


export {tasks};