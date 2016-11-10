
var submit = document.getElementById('submit-user');
submit.onclick = function() {
    console.log('here');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200)
            {
               console.log('User logged in.');
               alert('Logged in successfully.');
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

var submit1 = document.getElementById('submit-comment');
submit1.onclick = function() {
    alert('From main.js.');
    var inputName = document.getElementById('comment');
    var comment = inputName.value;
    inputName.value = '';
   
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
                    list += '<li> Comment:' + pairs[0] + '</li>';
                    list += '<li> @' + pairs[1] + '</li><br>';
            }
            var ul = document.getElementById('listing');
            ul.innerHTML = list;
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/submit-comment?comment=' + comment + '||' + new Date(), true);
    request.send(null);
    
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