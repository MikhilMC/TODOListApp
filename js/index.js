$(document).ready(()=>{
    $("#loginButton").click(()=>{
        validate(redirect);
    })
});

function validate(callback) {
    let userName = $("#userName").val().trim();
    let password = $("#password").val().trim();
    let errorMessage;
    if (userName == 'admin' && password == '12345') {
        // 1. Both user name and password is correct
        errorMessage = "";
        $('#userName').removeClass("textbox-error");
        $('#password').removeClass("textbox-error");
        callback();
    } else {
        if (userName == "" && password == "") {
            // 2. Both user name and password fields are blank
            errorMessage = ""
            $("#userName").attr("placeholder", "User name can not be blank");
            $("#password").attr("placeholder", "Password can not be blank");
            $('#userName').addClass('textbox-error');
            $('#password').addClass('textbox-error');
        } else if (userName == "" && password != "12345") {
            // 3. User name is blank, and password is incorrect
            errorMessage = 'Incorrect password.';
            $("#userName").attr("placeholder", "User name can not be blank");
            $('#userName').addClass('textbox-error');
            $('#password').addClass('textbox-error');
        } else if (userName == "" && password == "12345") {
            // 4. Password is correct, but user name is incorrect
            errorMessage = "";
            $("#userName").attr("placeholder", "User name can not be blank");
            $('#userName').addClass('textbox-error');
            $('#password').removeClass('textbox-error');
        } else if (userName != "admin" && password == "") {
            // 5. User name is incorrect, and password is blank
            errorMessage = 'Incorrect user name.';
            $("#password").attr("placeholder", "Password can not be blank");
            $('#userName').addClass('textbox-error');
            $('#password').addClass('textbox-error');
        } else if (userName != "admin" && password != "12345") {
            // 6. Both user name and password are incorrect
            errorMessage = 'Incorrect user name and password.';
            $('#userName').addClass('textbox-error');
            $('#password').addClass('textbox-error');
        } else if (userName != "admin" && password == "12345") {
            // 7. Password is correct but user name is incorrect
            errorMessage = 'Incorrect user name.';
            $('#userName').addClass('textbox-error');
            $('#password').removeClass('textbox-error');
        } else if (userName == "admin" && password == "") {
            // 8. User name is correct, but password is blank
            errorMessage = "";
            $("#password").attr("placeholder", "Password can not be blank");
            $('#userName').removeClass('textbox-error');
            $('#password').addClass('textbox-error');
        } else if (userName == "admin" && password != "12345") {
            // 9. User name is correct, but password is incorrect
            errorMessage = 'Invalid password.';
            $('#userName').removeClass('textbox-error');
            $('#password').addClass('textbox-error');
        }
    }

    if (errorMessage != "") {
        $("#errorMessage").html(errorMessage);
    } else {
        $("#errorMessage").html("");
    }
}

function redirect() {
    setTimeout(()=>{
        window.location.href = "./main.html";
    }, 1000);
}