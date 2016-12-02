//to get id of article
var currentArticle = window.location.pathname.split('/')[2];
loadLogin();
loadComments();


//to load comments
function loadComments() {
    console.log('load comments');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                    var commentLists = request.responseText;
                    commentList = JSON.parse(commentLists);
                    var list = '';
                    for (var i = 0; i < commentList.length; i++ ){
                        var time = new Date(commentList[i].timestamp);
                        list += `<div class="comment" style="font-size:13px;" >
                        <li>${commentList[i].comment}</li>
                        <p>${commentList[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} </p>
                        </div>`;
                        }
                    var ul = document.getElementById('listing');
                    ul.innerHTML = list;
                }
            } else {
                console.log(request.responseText);
                var noList = `<div class="comment" style="font-size:13px;" >
                     <p>No comments posted. </p>
                     </div>`;
                var ul = document.getElementById('listing');
                ul.innerHTML = noList;
            }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/load-comments/'+ currentArticle, true);
    request.send('null');
}

//load Comment edit box to be able to enter comments.
function loadLogin() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var commentform = document.getElementById('commentform');
            if (request.status === 200) {
                display1();
                displayForm();
            } else {
                display2();
                hideForm();
          }
        }
    };
    request.open('GET', 'http://aminavjith.imad.hasura-app.io/check-login', true);
    request.send('null');
}

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

function displayForm(){
    document.getElementById("commentform").style.display = "inline";
}

function hideForm(){
    document.getElementById("commentform").style.display = "none";
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
                       displayForm();
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
              hideForm();
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

//to submit new comment 
var submit4 = document.getElementById('submit-comment');
submit4.onclick = function() {
    var comment = document.getElementById('comment').value;
    if(comment === ''){
        alert('Please enter a comment.');
        }
        else{
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                if(request.readyState === XMLHttpRequest.DONE){
                    if (request.status === 200){
                        document.getElementById('comment').value = "";
                        document.getElementById('listing').value = "";
                        loadComments();
                    } else {
                        console.log(request.responseText);
                        alert('Not able to save comment.');
                    }
                }};
        var comment = document.getElementById('comment').value;
        request.open('POST','http://aminavjith.imad.hasura-app.io/submit-comment/' + currentArticle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));
        request.responseType = 'text';
        }
    };

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

    