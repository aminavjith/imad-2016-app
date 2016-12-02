var articleCategory = window.location.pathname.split('/')[2];
var timest = 5000;
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
   console.log('load articlelist');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                    var articleList = request.responseText;
                    //console.log((request.responseText));
                    articleList = JSON.parse(articleList);
                    var list = '';
                    for (var i = 0; i < articleList.length; i++ ){
                        //<a href="/articles/1"> HTML </a> <br>
                        list += `<a href="/articles/${articleList[i].id}">   ${articleList[i].heading} </a> <br>`;
                        }
                    var ul = document.getElementById('articleList');
                    ul.innerHTML = list;
                }
            }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/listing/?articleCategory=' + 'articleCategory', true);
    request.send('null');
}

//to log in
var submit1 = document.getElementById('submit-user');
submit1.onclick = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username === "" || password === ""){
        var errMsg = document.getElementById('errmsg');
        dispMsg = `<px>Please enter both username and password to login.</px>`;
        errMsg.innerHTML = dispMsg;
        document.getElementById("errmsg").style.display = "inline";
        setTimeout(function(){ 
            document.getElementById("errmsg").style.display = "none"; 
        }, 5000);
    } else{
        console.log('logging in');
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            var errMsg = document.getElementById('errmsg');
            if(request.readyState === XMLHttpRequest.DONE){
                if (request.status === 200){
                    var x = JSON.parse(this.responseText);
                    if(x === "Invalid creds."){
                        display2();
                        dispMsg = `<px>Invalid credentials.</px>`;
                        errMsg.innerHTML = dispMsg;
                        document.getElementById("errmsg").style.display = "inline";
                        setTimeout(function(){ 
                            document.getElementById("errmsg").style.display = "none"; 
                        }, 5000);
                    } else {
                       console.log('User logged in.');
                       display1();
                    }
                } else if(request.status === 403) {
                    dispMsg = `<px>Username/ password doesnot exist</px>`;
                    errMsg.innerHTML = dispMsg;
                    document.getElementById("errmsg").style.display = "inline";
                    setTimeout(function(){ 
                        document.getElementById("errmsg").style.display = "none"; 
                    }, 5000);
                } else if(request.status === 500) {
                    dispMsg = `<px>Unknown Error on sign in</px>`;
                    errMsg.innerHTML = dispMsg;
                    document.getElementById("errmsg").style.display = "inline";
                    setTimeout(function(){ 
                        document.getElementById("errmsg").style.display = "none"; 
                    }, 5000);
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
    var errMsg = document.getElementById('errmsg');
    if(username === '' || password === ''){
        dispMsg = `<px>Please enter new username and password to register</px>`;
        errMsg.innerHTML = dispMsg;
        document.getElementById("errmsg").style.display = "inline";
        setTimeout(function(){ 
            document.getElementById("errmsg").style.display = "none"; 
        }, 5000);
        return;
    } else{
    console.log('register');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            console.log('back in main');
            if (request.status === 200) {
               var x = JSON.parse(this.responseText);
               dispMsg = `<px>${x}</px>`;
               errMsg.innerHTML = dispMsg;
               document.getElementById("errmsg").style.display = "inline";
               setTimeout(function(){ 
                    document.getElementById("errmsg").style.display = "none"; 
               }, 5000);
            } else {
                dispMsg = `<px>Please enter new username and password to register</px>`;
                errMsg.innerHTML = dispMsg;
                document.getElementById("errmsg").style.display = "inline";
                setTimeout(function(){ 
                    document.getElementById("errmsg").style.display = "none"; 
                }, 5000);
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
                dispMsg = `<px>Unknown error, unable to log out now.</px>`;
                errMsg.innerHTML = dispMsg;
                document.getElementById("errmsg").style.display = "inline";
                setTimeout(function(){ 
                document.getElementById("errmsg").style.display = "none"; 
                }, 5000);
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
    var footerLogin = document.getElementById("footer");
    Login = `<form action="/ui/create-article.html/"> 
                <button type="submit" id="create-article" class="submit5">Click to create new article</button>
            </form> `;
    footerLogin.innerHTML = Login;
}

//to display login section after logging out
function display2() {
    document.getElementById("login").style.display = "inline";
    document.getElementById("logout").style.display = "none";
    var footerNoLogin = document.getElementById("footer");
    noLogin = `<p> Login to be able to enter comments and to create new articles. </p>`;
    footerNoLogin.innerHTML = noLogin;
}







