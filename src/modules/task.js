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