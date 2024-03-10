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

document.getElementById("form").addEventListener("submit", (event) =>{
    event.preventDefault();
   
    let a_priority = determinePriority();
    let a_name = document.getElementById("assignment_name").value;
    let a_hours = document.getElementById("assignment_hours").value;
    let a_worth = document.getElementById("assignment_worth").value;
    let a_date = document.getElementById("assignment_due_date").value;
    
    // figure out a way to get the course that was checked --> probably need to figure out how we are populating the courses first
    let a_num_tasks = 0;
    if (document.getElementById("yes_task_split").checked){
        
        a_num_tasks = document.getElementById("num_tasks").value;
        // can get each task here --> I'm not completely sure how we are storing the tasks
        task_hours = [];
        for (let i = 0; i < a_num_tasks; i++){
            task_hours.push(document.getElementById("task" + i).value);
            
        }
        for (let i = 0; i < a_num_tasks; i++){
            console.log(task_hours[i]);
            
        }
    }

    // Create a new form with the data to send to the assignment
    let formData = new FormData();
    formData.append("assignment", a_name);
    formData.append("hours", a_hours);
    formData.append("due", a_date);
    formData.append("value", a_worth);
    formData.append("priority", a_priority);

        fetch('http://localhost:3000/form/assignment', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formDataToUrlEncoded(formData),
        }).then(res => res.text())
        .then(res => console.log(res))
        console.log("here we are again!!!");


    // location.href = "landing_page.html";
});



function formDataToUrlEncoded(form) {
    console.log("here we are!!!");
    const pairs = [];
    for (const [key, value] of form.entries()) {
        // Encode each key and value, and add them to the pairs array
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    // Combine the pairs into a single query string
    return pairs.join('&');
}



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

