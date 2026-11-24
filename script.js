const taskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('bsTasks')) || [];

function saveTasks() {
    localStorage.setItem('bsTasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((taskText, index) => {
        const listItem = document.createElement('li');

        // Task text
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        // Button container
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'task-actions';

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit✏️';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', () => {
            const updatedText = prompt('Edit your task:', taskText);
            if (updatedText !== null && updatedText.trim() !== '') {
                tasks[index] = updatedText.trim();
                saveTasks();
                renderTasks();
            }
        });

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete🗑️';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        listItem.appendChild(textSpan);
        listItem.appendChild(buttonGroup);
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push(taskText);
    saveTasks();
    renderTasks();

    taskInput.value = '';
    taskInput.focus();
}

// Render saved tasks on page load
renderTasks();

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
});
