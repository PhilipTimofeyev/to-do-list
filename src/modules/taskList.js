import {Task} from "./task.js"

class TaskList {
	constructor() {
		this.list = []
	}

	addTask(title, description) {
		let newTask = new Task(title, description)
		this.list.push(newTask)
	}
}


const taskList = new TaskList




export {taskList};