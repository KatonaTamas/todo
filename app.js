const input = document.querySelector('#input');
const add = document.querySelector('#add');
const tasks = document.querySelector('.tasks');
const trash = document.querySelectorAll('.fa-minus');
const totalTasks = document.querySelector('#total-tasks');
const finishedTasks = document.querySelector('#finished-tasks');

add.addEventListener('click', (e)=>{
  e.preventDefault();
  newTask();
  taskCounters("increase", totalTasks);
  input.value = "";
});

function newTask() {
  let taskTitle = input.value;
  createNewField(taskTitle);
}

function createNewField(title) {
  //create 'added-task' div
  const addedTask = document.createElement('div');
  addedTask.classList.add('added-tasks');

  //create 'p' element, and add title
  const p = document.createElement('p');
  p.textContent = title;

  //create 'i' element
  const i = document.createElement('i');
  i.classList.add('fa');
  i.classList.add('fa-minus');
  i.setAttribute('aria-hidden', 'true');

  //add 'p' -> 'added-task'
  addedTask.appendChild(p);

  //add 'i' -> 'added-task
  addedTask.appendChild(i);

  //add 'addedTask' -> 'tasks'
  tasks.appendChild(addedTask);
}

//toggle stylings
function setStylings(item, backgroundColor, textColor) {
  item.style.backgroundColor = backgroundColor;
  item.style.color = textColor;
}

//text decorations
function setTextDecorations(value, item) {
  const child = item.childNodes;
  child[0].style.textDecoration = value;
}

//Save task
function taskActions(e) {
  let item = e.target;

  if(item.classList[0] === "added-tasks") {
    if(item.style.backgroundColor != "mediumpurple") {
      setStylings(item, "mediumpurple", "white");
      taskCounters("increase", finishedTasks); 
      setTextDecorations("line-through", item);
    }else {
      setStylings(item, "white", "#5d6569");
      taskCounters("decrease", finishedTasks);
      setTextDecorations("none", item);
    }
  }
}

//Control task counters
function taskCounters(operation, whatToChange) {
  let temp= parseInt(whatToChange.textContent);
    if(operation === "increase") {
      let result = temp+1;
      return whatToChange.innerHTML = result;
    }else if(operation === "decrease") {
      if(temp > 0){
        let result = temp-1;
        return whatToChange.innerHTML = result;
      }
    }else {
      return console.log(":(");
    }
}

//Remove task
function removeTask(e) {
  const item = e.target;

  if(item.classList[1] === "fa-minus") {
    const task = item.parentElement;
    tasks.removeChild(task);
    taskCounters("decrease", totalTasks);
    taskCounters("decrease", finishedTasks);
  }
}

window.addEventListener('click', taskActions);
window.addEventListener('click', removeTask);