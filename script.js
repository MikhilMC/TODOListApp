$(document).ready(function(){
    $('#loginButton').click(()=>{
        let userName = $('#userName').val().trim();
        let password = $('#password').val().trim();
        let errorMessage;
        if (userName !== '' && password !== '') {
            if (userName === 'admin' && password === '12345') {
                errorMessage = '';
                $('#userName').removeClass('textbox-error');
                $('#password').removeClass('textbox-error');
                $('body').load('./todo.html', ()=> {
                    let answer = '';
                    $.getJSON('https://jsonplaceholder.typicode.com/todos', (data)=>{
                        $.each(data, (task)=>{
                            if (data[task].completed == true) {
                                answer += `<tr class='bg-warning' id='row${data[task].id}'>`;
                                answer += `<td><input type="checkbox" class="ml-3" id="task${data[task].id}" checked disabled></td>`;
                                answer += `<td>${data[task].title}</td>`;
                            }
                            else {
                                answer += `<tr id='row${data[task].id}'>`;
                                answer += `<td><input type="checkbox" class="ml-3" id="task${data[task].id}"></td>`;
                                answer += `<td>${data[task].title}</td>`;
                            }
                            answer += "</tr>"
                        });
                        $('tbody').html(answer);
                    });
                });
                
            }
            else if (userName !== 'admin' && password === '12345') {
                errorMessage = 'Invalid user name.';
                $('#userName').addClass('textbox-error');
                $('#password').removeClass('textbox-error');
            }
            else if (userName === 'admin' && password !== '12345') {
                errorMessage = 'Invalid password.';
                $('#userName').removeClass('textbox-error');
                $('#password').addClass('textbox-error');
            }
            else {
                errorMessage = 'Invalid user name and password.';
                $('#userName').addClass('textbox-error');
                $('#password').addClass('textbox-error');
            }
        }
        else {
            if (userName === '' && password !== '') {
                if (password === '12345') {
                    errorMessage = "";
                    $("#userName").attr("placeholder", "User name can not be blank");
                    $('#userName').addClass('textbox-error');
                    $('#password').removeClass('textbox-error');
                }
                else {
                    errorMessage = 'Invalid password.';
                    $("#userName").attr("placeholder", "User name can not be blank");
                    $('#userName').addClass('textbox-error');
                    $('#password').addClass('textbox-error');
                }
            }
            else if (userName !== '' && password === '') {
                if (userName === 'admin') {
                    errorMessage = "";
                    $("#password").attr("placeholder", "Password can not be blank");
                    $('#userName').removeClass('textbox-error');
                    $('#password').addClass('textbox-error');
                }
                else {
                    errorMessage = 'Invalid user name.';
                    $("#password").attr("placeholder", "Password can not be blank");
                    $('#userName').addClass('textbox-error');
                    $('#password').addClass('textbox-error');
                }
            }
            else {
                errorMessage = ""
                $("#userName").attr("placeholder", "User name can not be blank");
                $("#password").attr("placeholder", "Password can not be blank");
                $('#userName').addClass('textbox-error');
                $('#password').addClass('textbox-error');
            }
        }
        if (errorMessage !== '') {
            $('#errorMessage').html(`<span class='text-danger'>${errorMessage}</span>`);
        }
        else {
            $("#errorMessage").html("");
        }
    });
    $(document).on("change", "[type=checkbox]", function(){
        let id = $(this).attr('id');
        id = id.slice(4);
        if (this.checked) {
            $(`tr#row${id}`).addClass('bg-warning');
            let promise1 = addCheckbox(id);
            promise1
                .then((e)=>{
                    alert(e[0]);
                    console.log(e[1]);
                })
                .catch((e)=>console.log(e));
        }
        else {
            $(`tr#row${id}`).removeClass('bg-warning');
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
        $('body').load('./login.html');
    })
});

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
