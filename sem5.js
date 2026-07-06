const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.querySelector('.taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask); 
    saveAndRender();
    taskInput.value = '';
    taskInput.focus();
}

function deleteTask(id) {
    const taskElements = taskList.querySelectorAll('li');
    
    taskElements.forEach(li => {
        if (li.querySelector('.delete-btn').getAttribute('onclick').includes(id)) {
    
            li.classList.add('removing');
            
            setTimeout(() => {
                tasks = tasks.filter(task => task.id !== id);
                saveAndRender();
            }, 400);
        }
    });
}


function toggleTask(id){
    tasks = tasks.map(task => {
        if (task.id === id){
            return{
                ...task, completed: !task.completed
            };
            
        }
        return task;
    });
    saveAndRender();
}

function saveAndRender(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks(){
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
        <span class="taskText" onclick="toggleTask(${task.id})">${task.text}</span>
         <button class="delete-btn" onclick="deleteTask(${task.id})">&times;</button>
        `;

        taskList.appendChild(li);
    });
}