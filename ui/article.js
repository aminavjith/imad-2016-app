var currentArticle = window.location.pathname.split('/')[2];
loadComments();
loadForm();

//to load comments
function loadComments() {
    alert('load comments');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE)
            {
            if (request.status === 200)
                {
                    var commentList = request.responseText;
                    commentList = JSON.parse(commentList);
                    var list = '';
                    for (var i = 0; i < commentList.length; i++ ){
                        list += `<div class="comment">
                        <p>${commentList[i].comment}</p>
                        <p>${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} </p>
                        </div>`;
                        }
                    var ul = document.getElementById('listing');
                    ul.innerHTML = list;
                }
            }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/load-comments/'+ currentArticle, true);
    request.send(null);
}

//load Comment edit box to be able to enter comments.
function loadForm(){
    console.log('Are you logged in?');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200)
            {
               console.log('User logged in.');
               displayform();
            }
            else
            {
                alert('Please login to be able to enter comments');
                hideform();
            }
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/check-login', true);
    request.send('null');
}


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
               displayform();
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
              hideform();
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

function displayform() {
    document.getElementById("commentform").style.display = "inline";
}

function hideform() {
    document.getElementById("commentform").style.display = "none";
}



//to submit comment new
var submit4 = document.getElementById('submit-comment');
submit4.onclick = function() {
    alert('submitting comment');
    var inputComment = document.getElementById('comment').value;
    if(inputComment === ''){
        alert('Please enter a comment.');
    }
    else{
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE)
        if (request.status === 200){
            loadComments();
        }
        else{
            alert('Not able to save comment.');
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/submit-comments?comment=' + comment + '||' + currentArticle, true);
    request.send(null);
    }
};



