import {Task} from "./task.js"

class TaskList {
	constructor() {
		this.list = []
	}

	addTask() {
		let newTask = new Task("Hello")
		this.list.push(newTask)
	}
}


const taskList = new TaskList




export {taskList};