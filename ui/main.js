onLoad ();
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

//to get article list
function onLoad(){
   console.log('load comments');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                    var articleList = request.responseText;
                    //console.log((request.responseText));
                    articleList = JSON.parse(articleList);
                    var list = '';
                    for (var i = 0; i < articleList.length; i++ ){
                        //<a href="/articles/article-one"> HTML </a> <br>
                        list += `<a href="/articles/${articleList[i].title}">   ${articleList[i].heading} </a> <br>`;
                        }
                    var ul = document.getElementById('articleList');
                    ul.innerHTML = list;
                }
            }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/listing', true);
    request.send('null');
}

//to log in
var submit1 = document.getElementById('submit-user');
submit1.onclick = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username === "" || password === ""){
        alert('Please enter both username and password to login.');
    } else{
        console.log('logging in');
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if (request.status === 200){
                    var x = JSON.parse(this.responseText);
                    if(x === "Invalid creds."){
                        alert(x);
                        display2();
                    } else{
                       console.log('User logged in.');
                       alert(x);
                       display1();
                    }
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
    request.open('POST','http://aminavjith.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
}};

// To register
var submit2 = document.getElementById('register');
submit2.onclick = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username === '' || password === ''){
        alert('Please enter both username and password to register.');
        return;
    } else{
    console.log('register');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            console.log('back in main');
            if (request.status === 200)
            {
               var x = JSON.parse(this.responseText);
               alert(x);
            }
            else
            {
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
    document.getElementById("submit5").style.display = "inline";
}

//to display login section after logging out
function display2() {
    document.getElementById("login").style.display = "inline";
    document.getElementById("logout").style.display = "none";
    document.getElementById("submit5").style.display = "none";
}





