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
        
    }
})

document.getElementById("add_assignment").addEventListener("click", determinePriority);

function determinePriority(){
    let worth = document.getElementById("assignment_worth").value;
    let dueDate = new Date(document.getElementById("assignment_due_date").value);
    let today = new Date();

    let differenceInMs = (dueDate.getTime() - today.getTime());
    let daysLeft = Math.round(differenceInMs/(1000*3600*24)) + 1;
    console.log("days left: " + daysLeft);
    console.log("worth: " + worth);
    

    let priority = 0;

    if (worth <= 5){
        priority += 1;
    } else if(worth <= 15){
        priority += 2;
    } else if(worth <= 25){
        priority += 3;
    } else if(worth <= 35){
        priority +=4;
    } else{
        priority += 5;
    }

    if (daysLeft <= 2){
        priority += 5; 
    } else if (daysLeft <= 5){
        priority += 4;
    } else if (daysLeft <= 8){
        priority += 3;
    } else if (daysLeft <= 15){
        priority += 2;
    } else{
        priority += 1;
    }

    console.log("priority number: " + priority);

    return priority;
}

