
loadLogin();
//check-login
function loadLogin() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
             console.log('User logged in.');
             display1();
          } else{
              display2();
          }
        }
    };
    request.open('GET', 'http://aminavjith.imad.hasura-app.io/check-login', true);
    request.send('null');
}


//to log in
var submit1 = document.getElementById('submit-user');
submit1.onclick = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username === "") {
        var userMsg = document.getElementById('userMsg');
        var msg1 = `<p style="color:red;">Please enter username</p>`;
        userMsg.innerHTML = msg1;
    } else if(password === ""){
        var pwdMsg = document.getElementById('pwdMsg');
        var msg2 = `<p style="color:red;">Please enter password</p>`;
        pwdMsg.innerHTML = msg2;
    } else{
        console.log('logging in');
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if (request.status === 200){
                    var x = JSON.parse(this.responseText);
                    if(x === "Invalid creds."){
                        var loginMsg = document.getElementById('loginMsg');
                        var msg3 = `<p style="color:red;">Credentials are invalid.</p>`;
                        loginMsg.innerHTML = msg3;
                        display2();
                    } else {
                       console.log('User logged in.');
                       display1();
                    }
                } else if(request.status === 403) {
                    alert('Incorrect credentials.');
                } else if(request.status === 500) {
                    alert('Unknown error');
                }
            }
        };
    request.open('POST','http://aminavjith.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
}};

// To register
var submit2 = document.getElementById('register');
submit2.onclick = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username === "") {
        var userMsg = document.getElementById('userMsg');
        var msg1 = `<p style="color:red;">Please enter username</p>`;
        userMsg.innerHTML = msg1;
    } else if(password === ""){
        var pwdMsg = document.getElementById('pwdMsg');
        var msg2 = `<p style="color:red;">Please enter password</p>`;
        pwdMsg.innerHTML = msg2;
    } else{
    console.log('register');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            console.log('back in main');
            if (request.status === 200) {
               var x = JSON.parse(this.responseText);
               alert(x);
            } else {
                alert('Not able to register');
            }
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/register?username=' + username + '||' + password, true);
    request.send('null');
}};

//to log out of the session
var submit3 = document.getElementById('logout-user');
submit3.onclick = function() {
    console.log('logout');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            console.log('back in main');
            if (request.status === 200) {
              display2();
            } else {
              alert('Not logged out');
            }
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/logout', true);
    request.send('null');
};

//to display logout section after successful login
function display1() {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "inline";
}

//to display login section after logging out
function display2() {
    document.getElementById("login").style.display = "inline";
    document.getElementById("logout").style.display = "none";
}

