document.getElementById("yes_task_split").addEventListener("click", function(ev){
    document.getElementById("num_tasks_div").style.display = "block";
})

document.getElementById("no_task_split").addEventListener("click", function(ev){
    document.getElementById("num_tasks_div").style.display = "none";
})

document.getElementById("num_tasks_btn").addEventListener("click", function(ev){
    document.getElementById("display_tasks").innerHTML = "";
    let numTasks = document.getElementById("num_tasks").value;
    let totalHours = document.getElementById("assignment_hours").value;

    for (let i = 0; i < numTasks; i++){
        let task = document.createElement("div");
        let taskInput = document.createElement("input");
        taskInput.setAttribute("type", "number");
        taskInput.setAttribute("value", totalHours/numTasks);
        taskInput.setAttribute("id", "task" + i);
        let taskLabel = document.createElement("label");
        taskLabel.setAttribute("id", "task_label" + i);
        taskLabel.setAttribute("for", "task" + i);
        taskLabel.setAttribute("class", "mx-2");
        let labelContent = document.createTextNode("Task " + (i + 1) + " hours: ");
        taskLabel.appendChild(labelContent);
        task.appendChild(taskLabel);
        task.appendChild(taskInput);
        document.getElementById("display_tasks").appendChild(task);
        console.log("hi");
    }
})

