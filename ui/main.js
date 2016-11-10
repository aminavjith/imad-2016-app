
var submit = document.getElementById('submit');
submit.onclick = function() {
    var inputName = document.getElementById('name');
    var name1 = inputName.value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE)
            if (request.status === 200)
            {
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i = 0; i < names.length; i++ ){
                    list += '<li>' + names[i] + '</li>';
                }
            var ul = document.getElementById('listing');
            ul.innerHTML = list;
            }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://aminavjith.imad.hasura-app.io/login', true);
    request.send(JSON.stringify({username: username, password: password}));
};

var submit1 = document.getElementById('submit_btn2');
submit1.onclick = function() {
    alert('From main.js.');
    var inputName = document.getElementById('comment');
    var comment = inputName.value;
    inputName.value = '';
    var inputName1 = document.getElementById('email');
    var email = inputName1.value;
    inputName1.value = '';
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
                    list += '<li> &nbsp;&nbsp;By:' + pairs[1] + '</li>';
                    list += '<li> @' + pairs[2] + '</li><br>';
                }
            var ul = document.getElementById('listing');
            ul.innerHTML = list;
            }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/submit-comment?comment=' + comment + '||' + email +'||' + new Date(), true);
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

img.onclick = function(){
    
      var interval= setInterval(moveRight,50);
}

<script>
      console.log('Hello World');
      alert('Hi, test only');
    </script>
    <script type="text/javascript" src="/ui/main.js">
    </script>
*/