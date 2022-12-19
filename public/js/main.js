const deleteItem = document.querySelectorAll('.del');
const markComplete = document.querySelectorAll('span.not');
const markIncomplete = document.querySelectorAll('span.completed');

Array.from(deleteItem).forEach(element => {
	element.addEventListener('click', deleteTodo);
});

Array.from(markComplete).forEach((element) => {
	element.addEventListener('click', todoCompleted);
});

Array.from(markIncomplete).forEach((element) => {
	element.addEventListener('click', todoIncomplete);
});

async function deleteTodo() {
	const todoId = this.parentNode.dataset.id;

	try {
		const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        });
		const data = await response.json();
		console.log(data);
		location.reload();

	} catch(error) {
		console.log(error);
	}
};


async function todoCompleted() {
	const todoId = this.parentNode.dataset.id;

	try {
		const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
		const data = await response.json();
		console.log(data);
		location.reload();

	} catch (error) {
		console.log(error);
	}
};

async function todoIncomplete() {
	const todoId = this.parentNode.dataset.id;

	try {
		const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
		const data = await response.json();
		console.log(data);
		location.reload();
		
	} catch (error) {
		console.log(error);
	}
}