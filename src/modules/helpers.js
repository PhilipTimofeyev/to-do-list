import { parseDate } from "./task.js"

const dateFns = require("date-fns");

export function removeTaskElement(id) {
    let taskToDelete = document.querySelector(`[data-task-id="${id}"]`)
    taskToDelete.remove()
}

export function setupTaskTemplate(task, project) {
    // Get DOM temp and buttons
    let temp = document.getElementById("task-template");
    let taskTemp = temp.content.cloneNode(true);
    let deleteTaskBtn = taskTemp.getElementById('deleteTaskBtn')
    let updateTaskBtn = taskTemp.getElementById('updateTaskBtn')

    // Get Temp elements
    let title = taskTemp.getElementById('task-title')
    let description = taskTemp.getElementById('task-description')
    let date = taskTemp.getElementById('task-date')
    let priority = taskTemp.getElementById('task-priority')
    let taskCheckbox = taskTemp.getElementById('taskCheckbox')

    taskCheckbox.addEventListener("change", function () {
        task.complete = this.checked
    });

    // Add event handlers

    deleteTaskBtn.addEventListener("click", function () {
        project.deleteTask(task.id)
        removeTaskElement(task.id)
        project.resetTaskIds()
        updatedTaskCount(project)
    });

    updateTaskBtn.addEventListener("click", function () {
        taskForm.dataset.action = "update";
        taskForm.dataset.taskId = task.id;
        fillForm(task.id, project);
        taskForm.showModal();
    });

    // Set data id so element and task object are related

    taskTemp.firstElementChild.setAttribute('data-task-id', task.id)

    // Set text of element

    console.log(task.title)
    console.log(task.description)
    title.innerText = task.title
    description.innerText = task.description
    date.innerText = task.date == "" ? "TBD" : dateFns.format(task.date, 'dd MMMM yyyy')
    priority.innerText = task.priority
    taskCheckbox.checked = task.complete

    return taskTemp
}

export function updatedTaskCount(project) {
    const taskCountEl = document.querySelector(`[data-id="${project.id}"] h4`)
    taskCountEl.innerText = `Tasks: (${project.count()})`
}

export function fillForm(taskId, project) {
    const task = project.findTask(taskId)
    const form = document.querySelectorAll(".formInput")

    form.forEach((input) => {
        let attribute = input.name

        input.name === 'date' ? input.value = parseDate(task.date) : input.value = task[attribute]
    })
}

export function clearForm() {
    const form = document.querySelectorAll(".formInput")

    form.forEach((input) => input.value = "")
}