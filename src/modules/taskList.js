import {Task} from "./task.js"

class Tasks {
	constructor() {
		this.list = [new Task("First Task", "Task Description", 1), new Task("Second Task", "Task Description", 2)]
	}

	addTask(title, description, id) {
		let newTask = new Task(title, description, id)
		this.list.push(newTask)
		return newTask
	}
}


const tasks = new Tasks


export {tasks};