document.addEventListener("DOMContentLoaded", () => {

    let input = document.getElementById("todo-input");
    let button = document.getElementById("add-task-btn");
    let list = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
        li.setAttribute("data-id", task.id);
        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;
        list.appendChild(li);

        li.addEventListener('click',(e)=>{
          if(e.target.tagname==='BUTTON') return
          task.completed != task.completed;
          li.classList.toggle("completed");
          saveTasks();
        })

        li.querySelector("button").addEventListener("click",(e)=>{
          e.stopPropagation();
          tasks=tasks.filter(t => (t.id != task.id))
          li.remove();
          saveTasks();

          
        })

    }
    // Save tasks function
    function saveTasks() {

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});