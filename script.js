document.addEventListener("DOMContentLoaded", () => {

    let input = document.getElementById("todo-input");
    let button = document.getElementById("add-task-btn");
    let list = document.getElementById("todo-list");

    let tasks = [];
    try {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        if (Array.isArray(savedTasks)) tasks = savedTasks;
    } catch {
        localStorage.removeItem("tasks");
    }

    // Render existing tasks
    tasks.forEach((task) => renderTask(task));

    button.addEventListener("click", () => {

        let tasktext = input.value.trim();

        if (tasktext === "") return;
        const newTask = {
            id: Date.now(),
            text: tasktext,
            completed: false
        };
        tasks.push(newTask);

        renderTask(newTask);
        saveTasks();

        input.value = "";
    });

    // Render task function
    function renderTask(task) {
        const li = document.createElement("li");
        li.dataset.id = String(task.id);

        const label = document.createElement("span");
        label.textContent = String(task.text ?? "");
        li.appendChild(label);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        li.appendChild(deleteButton);

        li.classList.toggle("completed", Boolean(task.completed));
        li.addEventListener("click", (event) => {
            if (event.target.closest("button")) return;
            task.completed = !task.completed;
            li.classList.toggle("completed", task.completed);
            saveTasks();
        });

        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            tasks = tasks.filter((item) => item.id !== task.id);
            li.remove();
            saveTasks();
        });

        list.appendChild(li);
    }

    // Save tasks function
    function saveTasks() {

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});