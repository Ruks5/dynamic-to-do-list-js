// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        const listItems = taskList.querySelectorAll('li');
        listItems.forEach(li => {
            const taskText = li.firstChild.textContent; // text before Remove button
            tasks.push(taskText.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task (taskText comes from input or Local Storage)
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Prevent adding empty tasks
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create task list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task and update Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            saveTasks();
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Add task on button click
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
