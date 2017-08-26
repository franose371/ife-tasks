class Task {
	constructor(title, date, content) {
		this.title = title;
		this.date = date;
		this.content = content;
	}

	editTitle(newTitle) {
		this.title = newTitle;
	}
	editDate(newDate) {
		this.date = newDate;
	}
	editContent(newContent) {
		this.content = newContent;
	}
}

var onEvent = (type) => {

}

export {
	Task,
	onEvent
}