export class Task {
	constructor(title, description, date, id) {
		this.title = title;
		this.description = description;
		this.date = date;
		this.id = id;
	}

	updateTask(newTitle, newDescription, newDate) {
		this.title = newTitle
		this.description = newDescription
		this.date = newDate
	}
}