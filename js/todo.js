let i = 0;
var kutu = document.querySelector("#list");  //ul id si #list
var eklenecekOge = document.querySelector("#task");

const checked = (e) => {
    const item = e.target;
    item.classList.toggle("checked");
}

if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(function (element) {
        i++;
        element.id = `id${i}`;
        localStorage.setItem('todos', JSON.stringify(todos));
        var eleman = document.createElement("li");
        eleman.addEventListener("click", checked);
        eleman.setAttribute('id', `id${i}`);
        eleman.innerHTML = `
        ${element.text} 
        <button 
        class="close" 
        style="width: 50px; height: 50px; text-align: center;"
        onclick="deleteElement(${i})"
        >x
        </button>
        `;
        kutu.appendChild(eleman);
    });
}
else {
    localStorage.setItem("todos", JSON.stringify([]));
}

function deleteElement(j) {
    const element = document.querySelector(`#id${j}`);
    let index = todos.findIndex(function (Atask) {
        return JSON.stringify(Atask).indexOf(`id${j}`) >= 0
    });
    todos.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(todos));
    todos = JSON.parse(localStorage.getItem('todos'));
    element.remove();
}


function newElement() {
    if (eklenecekOge.value.trim() == "") {
        $(".error").toast("show");
    }
    else {
        i++;
        var eleman = document.createElement("li");
        eleman.addEventListener("click", checked);
        eleman.setAttribute('id', `id${i}`);
        eleman.innerHTML = eleman.innerHTML = `
        ${eklenecekOge.value} 
        <button 
        class="close" 
        style="width: 50px; height: 50px; text-align: center;"
        onclick="deleteElement(${i})"
        >X
        </button>
        `;;
        kutu.appendChild(eleman);

        const todo = {
            text: eklenecekOge.value,
            isCompleted: false,
            id: `id${i}`,
        }

        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        eklenecekOge.value = "";
        $(".success").toast("show");
    }
}