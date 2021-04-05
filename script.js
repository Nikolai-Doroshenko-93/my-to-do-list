function onPageLoaded() {
    const input = document.querySelector("input[type='text']") 
    const ul = document.querySelector("ul.todos");
    const addBtn = document.getElementById("add-todo");
    const saveBtn = document.getElementById("save");
    const clearBtn = document.getElementById("clear");
    const showTipsBtn = document.getElementById("show-tips");
    const closeTipsBtn = document.getElementById("close-tips");
    const saveComplete = document.getElementById("save-complete");
    const continueBtn = document.getElementById("continue-button");
    const exitBtn = document.getElementById("exit-button");
    const closeSaveCompleteBtn = document.getElementById("close-save-complete");
    const tips = document.getElementById("tips");
    const writeToDo = document.getElementById("write-to-do");
    const crossCloseWriteToDo = document.getElementById("close-write-to-do");
    const writeToDoYesBtn = document.getElementById("write-to-do__button-yes");
    const writeToDoNoBtn = document.getElementById("write-to-do__button-no");
    const screenLock = document.getElementById("body-overlay");

    function createTodo() {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        const newTodo = input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("del-todo-button");

        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn);
    }


    function onClickTodo(event) {
        if (event.target.tagName === "LI" || event.target.tagName === "SPAN") {
            event.target.classList.toggle("checked");
        }
    }
    ul.addEventListener("click", onClickTodo);


    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }


    input.addEventListener ("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            if(input.value !== '') {
            createTodo();
            } else {
                alert('Write to-do');
            };
        }
    });
    
    function closeWriteToDo() {
        writeToDo.style.display = "none";
        screenLock.style.display = "none";
        writeToDo.classList.remove("disappearance-animation");
    }
    addBtn.addEventListener("click", () => {
        if (input.value !== "") {
            createTodo();
        } else {
            writeToDo.style.display = "block";
            writeToDo.classList.add("spawn-animation");
            screenLock.style.display = "block";
        }
    });
    writeToDoYesBtn.addEventListener("click", () => {
        createTodo();
        writeToDo.classList.add("disappearance-animation");
        setTimeout(closeWriteToDo, 300);
    })
    crossCloseWriteToDo.addEventListener("click", () => {
        writeToDo.classList.add("disappearance-animation");
        setTimeout(closeWriteToDo, 300);
    }); 
    writeToDoNoBtn.addEventListener("click", () => {
        writeToDo.classList.add("disappearance-animation");
        setTimeout(closeWriteToDo, 300);
    }); 
    addBtn.addEventListener('mousedown', e => e.preventDefault());
    

    saveBtn.addEventListener("click", () => {
        localStorage.setItem("todos", ul.innerHTML);
        saveComplete.style.display = "block";
        saveComplete.classList.add('spawn-animation');
        screenLock.style.display = "block";
    });
    saveBtn.addEventListener('mousedown', e => e.preventDefault());   
    function closeSaveComplete() {
        saveComplete.style.display = "none"
        saveComplete.classList.remove('disappearance-animation');
    };
    continueBtn.addEventListener("click", () => {
        saveComplete.classList.add('disappearance-animation');
        setTimeout(closeSaveComplete, 300);
        screenLock.style.display = "none";
    })
    closeSaveCompleteBtn.addEventListener("click", () => {
        saveComplete.classList.add('disappearance-animation');
        setTimeout(closeSaveComplete, 300);
        screenLock.style.display = "none";
    })
    exitBtn.addEventListener("click", () => {
        window.close();
    })


    clearBtn.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem('todos', ul.innerHTML);
    });
    clearBtn.addEventListener('mousedown', e => e.preventDefault());

   
    function closeTips() {
        tips.style.display = "none";
        tips.classList.remove('disappearance-animation');
    }
    showTipsBtn.addEventListener("click", () => {
        tips.style.display = "block";
        tips.classList.add('spawn-animation');
        screenLock.style.display = "block";
    });

    closeTipsBtn.addEventListener("click", () => {
        tips.classList.add('disappearance-animation');
        setTimeout(closeTips, 300);
        screenLock.style.display = "none";
    });


    screenLock.addEventListener("click", () => {
        tips.classList.add('disappearance-animation');
        setTimeout(closeTips, 300);
        screenLock.style.display = "none"; 
        saveComplete.classList.add('disappearance-animation');
        setTimeout(closeSaveComplete, 300);
        writeToDo.classList.add("disappearance-animation");
        setTimeout(closeWriteToDo, 300);
    });


    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }

    loadTodos();
}
document.addEventListener("DOMContentLoaded", onPageLoaded);
