$(document).ready(()=>{
    $("tbody").ready(()=>{
        generateData();
    })
    
    $(document).on("change", "[type=checkbox]", function(){
        let id = $(this).attr('id');
        id = id.slice(4);
        if (this.checked) {
            $(`tr#row${id}`).addClass('completed-task');
            let promise1 = addCheckbox(id);
            promise1
            .then((e)=>{
                alert(e[0]);
                console.log(e[1]);
            })
            .catch((e)=>console.log(e));
        }
        else {
            $(`tr#row${id}`).removeClass('completed-task');
            let promise2 = removeCheckbox(id);
            promise2
            .then((e)=>console.log(e))
            .catch((e)=>{
                alert(e[0]);
                console.log(e[1]);
            });
        }
    });

    $("#log-out").click(()=>{
        redirect();
    });
});

function generateData() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var output = "";
            response.forEach(element => {
                if (element.completed == true) {
                    output += `<tr class='completed-task' id='row${element.id}'>`;
                    output += `<td><input type="checkbox" class="ml-3" id="task${element.id}" checked disabled></td>`;
                    output += `<td>${element.title}</td>`;
                } else {
                    output += `<tr id='row${element.id}'>`;
                    output += `<td><input type="checkbox" class="ml-3" id="task${element.id}"></td>`;
                    output += `<td>${element.title}</td>`;
                }
                output += "</tr>"
            });
            $('tbody').html(output);
        }
    };

    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}

let todoList = [];

function addCheckbox(cbID) {
    return new Promise((resolve, reject) => {
        todoList.push(cbID);
        if (todoList.length == 5) {
            resolve(['Congrats. 5 tasks have been succesfully completed.', `Task ${cbID} has completed`]);
        }
        else {
            reject(`Task ${cbID} has completed`);
        }
    });
}

function removeCheckbox(cbID) {
    return new Promise((resolve, reject) => {
        let index = todoList.indexOf(cbID);
        todoList = todoList.slice(0, index).concat(todoList.slice(index+1));
        if (todoList.length == 0) {
            reject(["Sorry you haven't done any events.", `Task ${cbID} is uncompleted`]);
        }
        else {
            resolve(`Task ${cbID} is uncompleted`);
        }
    });
}

function logOut() {
    window.location.replace = "./index.html"
}