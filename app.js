let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to generate unique task ID
function generateId() {
    return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

// Function to save task data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add task
function addTask(task) {
    tasks.push(task);
    saveToLocalStorage();
    displayTasks();
}

// Function to display task list
function displayTasks() {
    const taskTableBody = document.querySelector("#taskTable tbody");
    taskTableBody.innerHTML = "";

    tasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>${task.category}</td>
            <td>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskTableBody.appendChild(row);
    });
}

// Function to delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    displayTasks();
}

// Function to edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    document.getElementById("taskId").value = task.id;
    document.getElementById("task").value = task.name;
    document.getElementById("status").value = task.status;
    document.getElementById("priority").value = task.priority;
    document.getElementById("category").value = task.category;
}

// Function to update task
function updateTask(updatedTask) {
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    saveToLocalStorage();
    displayTasks();
}

// Form submission event listener
document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const taskId = document.getElementById("taskId").value;
    const name = document.getElementById("task").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;

    if (taskId) {
        // Update existing task
        const updatedTask = { id: parseInt(taskId), name, status, priority, category };
        updateTask(updatedTask);
    } else {
        // Add new task
        const newTask = { id: generateId(), name, status, priority, category };
        addTask(newTask);
    }

    // Reset form
    document.getElementById("taskId").value = '';
    document.getElementById("task").value = '';
    document.getElementById("status").value = 'Pending';
    document.getElementById("priority").value = 'Low';
    document.getElementById("category").value = 'Personal';
});

// Initial display of tasks
displayTasks();
