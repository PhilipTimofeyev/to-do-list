import {Task} from "./task.js"

class Tasks {
	constructor() {
		this.list = [new Task("First Task", "Task Description", new Date("2/1/22"), "High", 1), new Task("Second Task", "Task Description", new Date("3/1/23"), "Low", 2)]
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


const tasks = new Tasks


export {tasks};