import {taskList} from "./taskList.js"

function displayApp() {
	console.log(taskList.list)
	taskList.addTask("Hello")
	console.log(taskList.list)
}




export {displayApp};