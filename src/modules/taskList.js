import {Task} from "./task.js"

// let x = new Task("First Task", "Task Description")

class Tasks {
	constructor() {
		this.list = [new Task("First Task", "Task Description"), new Task("Second Task", "Task Description")]
	}

	addTask(title, description) {
		let newTask = new Task(title, description)
		this.list.push(newTask)
		return newTask
	}
}


const tasks = new Tasks


export {tasks};