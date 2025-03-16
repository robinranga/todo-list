

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
addTaskButton.addEventListener('click', () => addTask(null))

// Add task by enter button
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter'){
        addTask();
    }
})


// Arrays to collect tasks
let array = JSON.parse(localStorage.getItem('tasks')) || []
let arrayAlt = JSON.parse(localStorage.getItem('tasksAlt')) || []

// Add task Function
function addTask(data){
    // Runs if input is not empty or there is data
    if (taskInput.value != "" || data){
        let embedData;
        // To load tasks from localStorage
        if (taskInput.value === "" || data){
            embedData = data ;
            
        }
        // To add Task manually
        else{
            embedData = taskInput.value
            array.push(embedData)
            updateStorage()
        }
        // creating new task element
        let newTask = document.createElement('div')

        // adding class to it
        newTask.classList.add('task-box')

        // Adding all the other element to task
        newTask.innerHTML = `<div class="task-cont">
                                            <div class="checkbox hover"></div>
                                            <div class="task">${embedData}</div>
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

// Function to update storage from arrays
function updateStorage(){
    localStorage.setItem("tasks", JSON.stringify(array))
    localStorage.setItem("tasksAlt", JSON.stringify(arrayAlt))
}


// function to load the tasks from localStorage when page loads

(function() {
    // Getting arrays from storage
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let tasksAlt = JSON.parse(localStorage.getItem('tasksAlt'))

    // For Array
    if (array.length != 0){
        tasks.forEach(task => {
            addTask(task)
    })}

    // For AltArrray
    if (arrayAlt.length != 0){
        tasksAlt.forEach(task => {
            addTask(task)
            completeTask(null,task)
    })}
})();


// Function to delete a task
function deleteTask(event) {
    // getting the task to remove
    let taskToRemove = event.target.closest('.task-box'); // Find the closest parent div

    if (taskToRemove) {
        // Getting inner text of task
        let taskTxt = taskToRemove.querySelector('.task').innerText

        // To delete from array
        if (array.includes(taskTxt)){
            array.splice(array.indexOf(taskTxt),1)
            updateStorage()
        }

        // to delete from AltArray
        if (arrayAlt.includes(taskTxt)){
            arrayAlt.splice(arrayAlt.indexOf(taskTxt),1)
            updateStorage()
        }
        
        // Removing the task from HTML
        taskToRemove.remove();
    }
}


// function to complete a task
function completeTask(event, data){

    // getting the task to remove
    let taskToComplete;

    // To complete tasks from localStorage on reload
    if (!event){        
        document.querySelectorAll('.task').forEach(task => {
            if (task.innerText === data){
                taskToComplete = task.closest('.task-box');
            }
        })
    }
    // Completing task manually
    else{
        taskToComplete = event.target.closest('.task-box'); // Find the closest parent div
    }
    
    if (taskToComplete){
        
        // Intialisizing inner elements to change
        
        let innerTxt = taskToComplete.querySelector('.task')
        let check = taskToComplete.querySelector('.checkbox')
        let complete = taskToComplete.querySelector('.nocut')

        // Aduio Element
        let aud = document.querySelector('#sound');
        aud.muted = false;
        
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

        // Inner text of the task
        let taskTxt = innerTxt.innerText


        if (array.includes(taskTxt)){
            // Removing from arry
            array.splice(array.indexOf(taskTxt),1)
            // Adding to AltArray
            arrayAlt.push(taskTxt)
            updateStorage()

        }

        // playing audio for check if it is added manually
        if (event){
            aud.play()
        }
        
        // removing the event listener to prevent clicking again 
        check.removeEventListener('click', completeTask);
    }
}


// Adding visually apealing hover effects 


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

taskInput.addEventListener("mouseover", () => {
    if (document.activeElement !== taskInput) { 
        inputBox.style.backgroundColor = "rgb(45, 45, 45, .9)";
    }
});

taskInput.addEventListener("mouseout", () => {
    if (document.activeElement !== taskInput) { 
        inputBox.style.backgroundColor = "rgb(17, 16, 16, 0.9)";
    }
});


