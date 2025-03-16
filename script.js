

// Functionality of Dates and Times

let timeBox = document.querySelector('#time-cont') 
let dateBox = document.querySelector('#date')


function setDate(){
    let currentTime = new Date() // Gettin current Time
    
    // Converting to 12 HR Format
    let ampm  = currentTime.getHours() > 12 ? "PM" : "AM" 
    let hours = currentTime.getHours() % 12 || 12
    
    // Updating the Time Box every second
    timeBox.innerHTML = `${hours.toString().padStart(2, "0")} : ${currentTime.getMinutes().toString().padStart(2, "0")} ${ampm}`

    // Updating the date box
    dateBox.innerHTML = `${currentTime.toLocaleString("en-us", { month: "short" })} ${currentTime.getDate()}, ${currentTime.getFullYear()}`
}

setDate()


setInterval(
    setDate, 1000
)



// Internal working Functionality


// Initialisizing the elements of task

let addTaskButton = document.querySelector('#plus')

let taskInput = document.querySelector('input')

let taskContainer = document.querySelector('main')

let deleteTaskButtons = Array.from(document.querySelectorAll('.delete-button'))


// Event on Add Button
addTaskButton.addEventListener('click', addTask)

// Add task by enter button
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter'){
        addTask();
    }
})


// Add task Function
function addTask(){
    // Runs if input is not empty
    if (taskInput.value != ""){
        // creating new task element
        let newTask = document.createElement('div')

        // adding class to it
        newTask.classList.add('task-box')

        // Adding all the other element to task
        newTask.innerHTML = `<div class="task-cont">
                                            <div class="checkbox hover"></div>
                                            <div class="task">${taskInput.value}</div>
                                            <div class="nocut">Completed</div>                            
                                        </div>
                                        <div class="delete-button"><i class="fa-solid fa-trash"></i></div>`
        // Adding task to the container
        taskContainer.append(newTask)

        // Removing text from input after adding task
        taskInput.value = ""

        // adding event on delete button
        newTask.querySelector('.delete-button').addEventListener('click',deleteTask);

        // adding event on complete button
        newTask.querySelector('.checkbox').addEventListener('click', completeTask);
    
        
    }else{
        return
    }
}



// Function to delete a task
function deleteTask(event) {
    // getting the task to remove
    let taskToRemove = event.target.closest('.task-box'); // Find the closest parent div
    if (taskToRemove) {
        // removing the task
        taskToRemove.remove();
    }
}


// function to complete a task
function completeTask(event){
    // getting the task to remove
    let taskToComplete = event.target.closest('.task-box'); // Find the closest parent div
    if (taskToComplete){

        // Intialisizing inner elements to change
        let innerTxt = taskToComplete.querySelector('.task')
        let check = taskToComplete.querySelector('.checkbox')
        let complete = taskToComplete.querySelector('.nocut')

        // Updating some styling
        innerTxt.style.color = "rgba(255, 255, 255, 0.6)"
        check.innerHTML = '<i class="fa-solid fa-check"></i>'
        check.classList.remove('hover')
        check.style.backgroundColor = 'green'
        check.style.height = "25px"
        check.style.width = "25px"
        check.style.border = 'green'
        innerTxt.style.textDecoration = "line-through"
        complete.style.display = "flex"
        
        // removing the event listener to prevent clicking again 
        check.removeEventListener('click', completeTask);
    }
}





// Adding visually apealing hover effects 



// let addTaskButton = document.querySelector('#plus')

// let taskInput = document.querySelector('input')

// let taskContainer = document.querySelector('main')

// let deleteTaskButtons = Array.from(document.querySelectorAll('.delete-button'))


// Initializing some more elements

let inputBox = taskInput.closest('#footer')

let checkBoxes =  document.querySelectorAll(".checkbox")


// Adding Focus effect on input box
taskInput.addEventListener("focus", () => {
    inputBox.style.backgroundColor = "rgb(45, 45, 45, .9)";
});

taskInput.addEventListener("blur", () => {
    inputBox.style.backgroundColor = "rgb(17, 16, 16, 0.9)";
});


// Hover Effect on check box


checkBoxes.forEach(box => {
    box.addEventListener('mouseover', () => {
        if (!box.querySelector('i')) { // Prevent adding multiple icons
            let icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-check'); // Font Awesome check icon
            box.appendChild(icon);
        }
    });

    box.addEventListener('mouseout', () => {
        let icon = box.querySelector('i');
        if (icon) {
            icon.remove();
        }
    });
});



