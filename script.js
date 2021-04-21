'use strict'
const toDoWriting = document.getElementById('to-do-writing');
const toDoList = document.getElementById('to-do-list');
const addToDo = document.getElementById('add-to-do-btn');
const navTabMenu = document.getElementById('header__nav__link-box');
const tabAll = document.querySelector('.header__nav__link-box--link__all');
const taskListBlock = document.querySelector('.content__to-do-box__ul');
const input = document.querySelector('.header__logo-and-search__search');

    window.onload = () => {
        const data = localStorage.getItem("todos");
        if (data) {
            toDoList.innerHTML = data;
        }
    }
    function createToDo() {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        const star = document.createElement('div');
        const newTodo = toDoWriting.value;
        const deleteBtn = document.createElement('a');
        const importantBtn = document.createElement('button');
        importantBtn.appendChild(document.createTextNode("IMPORTANT"));

        textSpan.append(newTodo);
        li.append(star);
        li.append(importantBtn);
        toDoList.appendChild(li).append(textSpan);
        star.classList.add('content__to-do-box__ul--li__star');
        li.classList.add('content__to-do-box__ul--li');
        toDoWriting.value = "";

        importantBtn.classList.add('content__to-do-box__ul--li__important-btn-green');
        li.append(importantBtn);

        deleteBtn.classList.add('content__to-do-box__ul--li__delete-btn__icon');
        li.append(deleteBtn)

        localStorage.setItem("todos", toDoList.innerHTML);
    }

    function deleteToDo(e) {
        const del = e.target.closest('.content__to-do-box__ul--li__delete-btn__icon');
        if (del) {
            const task = del.closest('.content__to-do-box__ul--li');
            toDoList.removeChild(task);
            localStorage.setItem("todos", toDoList.innerHTML);
        }
    }

    function importantBtnClick(e) {

        const tar = e.target.closest('.content__to-do-box__ul--li__important-btn-green');
        if (tar) {
           
            const task = tar.closest('.content__to-do-box__ul--li');
            const star = task.querySelector('.content__to-do-box__ul--li__star');  
            const textTask = task.querySelector('.content__to-do-box__ul--li span');  
            const importantBtn = task.querySelector('.content__to-do-box__ul--li__important-btn-green')
            star.classList.toggle('content__to-do-box__ul--li__star-visible');
            textTask.classList.toggle('content__to-do-box__ul--li__bold-span');
            importantBtn.classList.toggle('content__to-do-box__ul--li__important-btn-gray');
            importantBtn.innerHTML =
            (importantBtn.innerHTML === 'IMPORTANT') ? importantBtn.innerHTML = 'NOT IMPORTANT' : importantBtn.innerHTML = 'IMPORTANT';
            
        }
        localStorage.setItem("todos", toDoList.innerHTML);
    }
    
    function completeTaskClick (e) {  
        const tar = e.target;      
         if(tar.className === 'content__to-do-box__ul--li') {
            const textSpan = tar.querySelector('.content__to-do-box__ul--li span')
            textSpan.classList.toggle('content__to-do-box__ul--li__line-through-span');
            const task = textSpan.parentElement;
            const importantBtn = task.querySelector('.content__to-do-box__ul--li__important-btn-green');
            importantBtn.classList.toggle('display-none');
         }
         if(tar.tagName === 'SPAN') {
            const textSpan = tar.closest('.content__to-do-box__ul--li span')
            textSpan.classList.toggle('content__to-do-box__ul--li__line-through-span');
            const task = textSpan.parentElement;
            const importantBtn = task.querySelector('.content__to-do-box__ul--li__important-btn-green');
            importantBtn.classList.toggle('display-none');
         }
        localStorage.setItem("todos", toDoList.innerHTML);
    }

    function tabClick() {
        const tabs = document.querySelectorAll('.header__nav__link-box--link');
        const all = document.querySelector('.header__nav__link-box--link__all');
        const active = document.querySelector('.header__nav__link-box--link__active');
        const done = document.querySelector('.header__nav__link-box--link__done');
        const scroll = document.querySelectorAll('.header__nav__scroll-item');
        const addToDoBlock = document.querySelector('.content__add-to-do');
             
        function removeCurrentClass() {
            
            for (let i=0;i<tabs.length;i++) {
                tabs[i].classList.remove('header__nav__link-box--link__current');
                scroll[i].classList.remove('header__nav__scroll-item-current');
            }
        }
        all.addEventListener('click', () => {
            addToDoBlock.style.display = "block";
            removeCurrentClass()
            all.classList.add('header__nav__link-box--link__current');
            scroll[0].classList.add('header__nav__scroll-item-current');
            const li = document.querySelectorAll('.content__to-do-box__ul--li');

            for (let i=0; i<li.length; i++) {
                li[i].style.display = 'block';
            }
            localStorage.setItem("todos", toDoList.innerHTML);
        });
        active.addEventListener('click', () => {
            addToDoBlock.style.display = "block";
            removeCurrentClass()
            active.classList.add('header__nav__link-box--link__current');
            scroll[1].classList.add('header__nav__scroll-item-current');
            const li = document.querySelectorAll('.content__to-do-box__ul--li');
            const span = document.querySelectorAll('.content__to-do-box__ul--li span');
            for (let i=0; i<li.length; i++) {
               let a = window.getComputedStyle(span[i]).textDecoration;
               if(a === 'line-through solid rgb(128, 128, 128)') {
                   li[i].style.display = 'none';
               } else {
                li[i].style.display = 'block';
               }
            }
        });
        done.addEventListener('click', () => {
            addToDoBlock.style.display = "none";
            removeCurrentClass()
            done.classList.add('header__nav__link-box--link__current');
            scroll[2].classList.add('header__nav__scroll-item-current');
            const li = document.querySelectorAll('.content__to-do-box__ul--li');
            const span = document.querySelectorAll('.content__to-do-box__ul--li span');
            for (let i=0; i<li.length; i++) {
               let a = window.getComputedStyle(span[i]).textDecoration;
               if(a === 'line-through solid rgb(128, 128, 128)') {
                   li[i].style.display = 'block';
               } else {
                li[i].style.display = 'none'; 
               }
            }  
        });
    }
    tabClick();

    function searchInputHandler(e) {
        tabAll.click();
      
        taskListBlock.childNodes.forEach(node => {
      
          if (!node.querySelector('span').innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
            node.style.display = 'none';
          }
          else {
            node.style.display = 'block';
          }
        });
      }
    
    addToDo.addEventListener('click', createToDo);
    toDoList.addEventListener('click', (e) => deleteToDo(e));
    toDoList.addEventListener('click', (e) => importantBtnClick(e));
    toDoList.addEventListener('click', (e) => completeTaskClick(e));
    input.addEventListener('input', (e) => searchInputHandler(e));



// let addMessage = document.querySelector('.content__add-to-do__input');
// let addButton = document.querySelector('.content__add-to-do__btn');
// let todo = document.querySelector('.content__to-do-box__ul');

// let todoList = [];

// if(localStorage.getItem('todo')) {
//     todoList = JSON.parse(localStorage.getItem('todo'));
//     displayToDos();
// }

// addButton.addEventListener('click', function() {
    
//     let newToDo = {
//         todo: addMessage.value,
//         checked: false,
//         important: false
//     };
    
//     todoList.push(newToDo);
//     displayToDos();
//     localStorage.setItem('todo', JSON.stringify(todoList));
// });
//  function displayToDos() {
//     let displayMessage = '';
//     todoList.forEach(function(item, i) {
//         displayMessage += `
//         <li class="content__to-do-box__ul--li" id=li_${i}>
//             <span id="span_${i}" class="content__to-do-box__ul--li span">${item.todo}</span>
//             <button id="imp-btn_${i}">IMPORTANT</button>
//             <div id="del_${i}" class="content__to-do-box__ul--li__delete-btn__icon"></div>
//         </li>
//         `;
//         todo.innerHTML = displayMessage;  
//     })

//  }

//  function completeTaskClick(e) {
//      const tar = e.target;
//     if(tar.tagName === 'LI') {
//         tar.classList.toggle('content__to-do-box__ul--li__line-through-span');
//         item.checked = !item.checked;
//         localStorage.setItem('todo', JSON.stringify(todoList));
//     }
//  }

//  let deleteBtn = document.getElementsByClassName('content__to-do-box__ul--li__delete-btn__icon');
//  let i;
//  for (i=0; i<deleteBtn.length; i++) {
//     deleteBtn[i].onclick = function() {
//         var li = this.parentElement;
//         li.remove();
//         localStorage.setItem('todo', JSON.stringify(todoList))
//     }
//  }

//  todo.addEventListener('click', (e) => completeTaskClick(e));