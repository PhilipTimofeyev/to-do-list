export class Task {
	constructor(title, description, date, priority, id) {
		this.title = title;
		this.description = description;
		this.date = date;
		this.priority = priority;
		this.id = id;
	}

	updateTask(newTitle, newDescription, newDate, newPriority) {
		this.title = newTitle;
		this.description = newDescription;
		this.date = newDate;
		this.priority = newPriority;
	}
}

export function resetTaskIds(project) {
	project.list.forEach((task, idx) => {
		const newId = idx + 1
		const taskElement = document.querySelector(`[data-task-id="${task.id}"]`)

		taskElement.setAttribute('data-task-id', newId)
		task.id = newId
	})
}

export function parseDate(date) {
	if (date === "") return null
	return date.getFullYear().toString().padStart(4, '0') + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}