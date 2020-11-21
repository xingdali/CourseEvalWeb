$(document).ready(function(){



    $("#signup").on("click", function(e){
        e.preventDefault();
        handleSignup(document.getElementById("s-user").value,document.getElementById("s-pass").value/*,document.getElementById("s-email")*/);
    });

    $("#login").on("click", function(e){
        e.preventDefault();
        handleLogin(document.getElementById("l-user").value,document.getElementById("l-pass").value);       
        
    });


});


async function handleSignup(user,pass){
    const makeUser = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/account/create',
        "data":{
            "name": user,
            "pass": pass,
        }
    });
}


async function handleLogin(user,pass){
    const loginUser = await $.ajax({
        method: 'post',
        url: 'http://localhost:3000/account/login',
        "data":{
            "name": user,
            "pass": pass,
        }
    })
}