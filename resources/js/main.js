// Local storage
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};


// SVG icons variables
let removeSVG = `<svg style="enable-background:new 0 0 22 22"version=1.1 viewBox="0 0 22 22"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><rect class=noFill height=22 width=22 /><g><path class=fill d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3
c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9
C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7
c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2
c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class=fill d=M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z /></g><g><path class=fill d=M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z /></g><g><path class=fill d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8
    C14.6,17.7,14.3,18,14,18z"/></g></g></svg>`;

let completeSVG = `<svg style="enable-background:new 0 0 22 22"version=1.1 viewBox="0 0 22 22"x=0px xml:space=preserve xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink y=0px><rect class=noFill height=22 width=22 y=0 /><g><path class=fill d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8
c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>`;

// Render the lists 
 renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function() {
  let value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});

document.getElementById('item').addEventListener('keydown', function (e) {
  let value = this.value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
    addItem(value);
  }
});

function addItem (value) {
  
  document.getElementById('item').value = '';
  // sendItemToAPI(value, (item=>{
    
    
  // }));
  
  addItemToDOM(value);
  data.todo.push(value);
  dataObjectUpdated();
  
}

function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (let item of data.todo) {
    let value = item;
    addItemToDOM(value);
  }

  for (let item of data.completed) {
    let value = item;
    addItemToDOM(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  // Check if the item should be added to the completed list or to re-added to the todo list
  let target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
  let list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

  let item = document.createElement('li');
  item.innerText = text;
  //item.setAttribute('data-id', task.id);

  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing the item
  remove.addEventListener('click', removeItem);

  let complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  // Add click event for completing the item
  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

// Method foe sending to item to API
// function sendItemToAPI(item, callback){
//   // let req = new Request('/add',{
//   //   method: 'POST',
//   //   headers: {
//   //     "Content-type": "application/json"
//   //   }
//   // })
//   // fetch(req)
//   // .then( (res)=>res.json())
//   // .catch((err)=>console.log(err))


//   let req = new XMLHttpRequest();
//   req.open('POST', '/add');
//   req.setRequestHeader('Content-Type', 'application/json');
//   req.send(JSON.stringify({item:item}));

//   req.addEventListener('load', ()=>{
//     let results = JSON.parse(req.responseText);
//     if (results.error) return console.log(results.error);

//     if (callback) callback(results);
    
//   })

//   req.addEventListener('error', ()=>{
    
//     console.log('Error happenned');
    
//   })
// }