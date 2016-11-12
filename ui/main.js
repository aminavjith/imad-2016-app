
var submit3='';
var submit1 = document.getElementById('submit-user');
submit1.onclick = function() {
    console.log('login');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200)
            {
               console.log('User logged in.');
               alert('Logged in successfully.');
                var element = document.getElementById("username"); 
                element.parentNode.removeChild(element);
                
                element = document.getElementById("password"); 
                element.parentNode.removeChild(element);
                
                element = document.getElementById("register"); 
                element.parentNode.removeChild(element);
                
                element = document.getElementById("submit-user"); 
                element.parentNode.removeChild(element);

                var submit3 = document.createElement("button");
                button.innerHTML = "Do Something";
               /*var listing = document.getElementById('login');
               var loggedIn =` <u> You are successfully logged in</u>
                <br>
                <button type="button" id="log" value="Logout">Logout</button>
                <br>
                <br>
                <br>`;
                listing.innerHTML = loggedIn;
                var submit3 = document.getElementById('log');
                */
            }
            else if(request.status === 403)
            {
                alert('Incorrect credentials.');
            }
            else if(request.status === 500)
            {
                alert('Unknown error');
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://aminavjith.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

var submit2 = document.getElementById('register');
submit2.onclick = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log('register');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            console.log('back in main');
            if (request.status === 200)
            {
               alert('Registered successfully.');
            }
            else 
            {
                alert('Not able to register');
            }
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/register?username=' + username + '||' + password, true);
    request.send('null');
};


submit3.onclick = function() {
    console.log('logout');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            console.log('back in main');
            if (request.status === 200)
            {
               var listing = document.getElementById('login');
               var logIn =`<u> Sign in to be able to comment: </u>
                            <br>
                            <input type="text" id="username" placeholder="username"/><br>
                            <input type="password" id="password"/><br>
                            <button type ="button" id="register" value="Register">Register</button><br>
                            <button type="button" id="submit-user" value="Login">Login</button>
                            <br>
                            <br>
                            <br>`;
                listing.innerHTML = logIn;
            }
            else 
            {
                alert('Not logged out');
            }
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/logout', true);
    request.send('null');
};

/*console.log('Loaded!');
alert('From main.js.');

var element = document.getElementById('text1');
element.innerHTML = 'Amritha Navjith';

var img = document.getElementById('img1');

var marginLeft=0;
function moveRight(){
    if(marginLeft<300)
    {
        marginLeft = marginLeft + 1;
    }
    else
    {
        marginLeft = 300;
    }
    img.style.marginLeft = marginLeft + 'px';
}

*/