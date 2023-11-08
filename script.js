

let tasks = JSON.parse(localStorage.getItem("todoList")) || [];

const taskList = document.getElementById("list");
const taskInput = document.getElementById("task");
const addTaskIcon = document.getElementById('add');
const taskCounter = document.getElementById("taskCount");



// Checks total active task
function getActiveTaskLength() {
  let db = JSON.parse(localStorage.getItem("todoList")) || [];
  let activeItems = db.filter((item) => item.status === "active");

  return activeItems.length;
}

function getCompletedTaskLength() {
  let db = JSON.parse(localStorage.getItem("todoList")) || [];
  let completedItems = db.filter((item) => item.status === "completed");

  return completedItems.length;
}

function renderList(){

    taskList.innerHTML ='';
    for( let i=0; i < tasks.length; i++){
        addTasktoDom(tasks[i]);
    }

    taskCounter.innerHTML = `Tasks(${tasks.length})`;
    let activeTask = getActiveTaskLength();
        let completedTasks = getCompletedTaskLength();
        const activeT = document.querySelector(".activeT");
        const completedT = document.querySelector(".completedT");
        activeT.innerText = `Active (${activeTask})`;
        completedT.innerText = `Completed (${completedTasks})`;
}

function addTasktoDom(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = task.id; // Set the id attribute
    checkbox.checked = task.status === "completed"; // Check the checkbox if the task is completed
    checkbox.addEventListener('change', function () {
        toggleTask(task.id);
    });

    const label = document.createElement('label');
    label.textContent = task.title;
    label.htmlFor = task.id; // Set the htmlFor attribute to associate the label with the checkbox

    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa fa-trash-o';
    deleteButton.addEventListener('click', function () {
        deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}


function toggleTask(taskId){

    let newTasks = tasks.filter((element) =>{
        return element.id == Number(taskId);
    });

    if(newTasks.length > 0){

        const currentTask = newTasks[0];
        currentTask.status =
      currentTask.status === "active" ? "completed" : "active";
        localStorage.setItem("todoList", JSON.stringify(tasks));
        renderList();
        // showNotification("Task toggled Succesfully");
        return;
    }

    showNotification("Could not toggle task");

}

function addTask(task){

    if(task){

         tasks.push(task);
                localStorage.setItem("todoList", JSON.stringify(tasks));
                renderList();
                // showNotification("Task added successfully");

    }
}

function deleteTask(taskId) {
    
            tasks = tasks.filter(task => task.id !== taskId);
            localStorage.setItem("todoList", JSON.stringify(tasks));
            renderList();
            // showNotification("Task deleted successfully");
        }

function showNotification(text){
    alert(text);
}

// removeChecked() removes completed task
function removeChecked() {

  tasks = tasks.filter((item) => item.status != "completed");

  localStorage.setItem("todoList", JSON.stringify(tasks));
  renderList();
}

function handleAddIconEventListener(){
    
        const text = taskInput.value;
        console.log(text);
        if(!text){
            showNotification("Task text cannot be empty");
            return;
        }
        const task = {
            title:text,
            id: Date.now().toString(),
            status: "active",
        }

        taskInput.value = '';
        addTask(task);
    }

    function handleClickEventListener(event) {
        const target = event.target;

        console.log(target);
        
        if(target.className == 'fa fa-trash-o'){
            
            const taskId = target.id;
            deleteTask(taskId);
            return;
        }

        else if(target.className == 'custom-checkbox'){

            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }

    function initializeApp() {

        renderList();
        addTaskIcon.addEventListener('click', handleAddIconEventListener);
        document.addEventListener('click', handleClickEventListener);
    }

    initializeApp();
