import {taskList} from "./taskList.js"

const taskContainer = document.getElementById('tasks-container')

// Buttons
const addTaskBtn = document.getElementById('addTaskBtn')


// Event Listeners
	addTaskBtn.addEventListener("click", function() {
		taskList.addTask("Hello", "I am a task");
		showContent()
	});

// 

function displayApp() {
}

function showContent() {
  let temp = document.getElementById("task-template");
  let clon = temp.content.cloneNode(true);

  let title = clon.getElementById('task-title')
  let description = clon.getElementById('task-description')

  console.log(description)

  title.innerText = taskList.list[0].title
  description.innerText = taskList.list[0].description
  taskContainer.appendChild(clon);
}




export {displayApp};