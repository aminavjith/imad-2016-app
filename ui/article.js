//to log in
var submit1 = document.getElementById('submit-user');
submit1.onclick = function() {
    console.log('logging in');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200)
            {
               console.log('User logged in.');
               alert('Logged in successfully.');
               display1();
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
    request.open('POST','http://aminavjith.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

// To register
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

//to log out of the session
var submit3 = document.getElementById('logout-user');
submit3.onclick = function() {
    console.log('logout');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            console.log('back in main');
            if (request.status === 200)
            {
              display2();
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

//to submit comment
var submit = document.getElementById('submit-comment');
submit.onclick = function() {
    alert('submitting comment');
    var inputComment = document.getElementById('comment');
    var comment = inputComment.value;
    //inputName.value = '';
var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
        if (request.status === 200)
            {
                var names = request.responseText;
                names = JSON.parse(names);
                var splitter = '';
                var list = '';
                for (var i = 0; i < names.length; i++ ){
                    splitter = names[i];
                    var pairs = splitter.split('||');
                    list += '<li>' + pairs[0] + '</li>';
                    list += '<li> @' + pairs[1] + '</li><br>';
            }
            var ul = document.getElementById('listing');
            ul.innerHTML = list;
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/submit-comment?comment=' + comment + '||' + new Date(), true);
    request.send(null);
};

