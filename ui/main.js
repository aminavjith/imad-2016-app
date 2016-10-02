
/*var button = document.getElementById('button1');
var counter = 0;
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE)
            if (request.status === 200)
            {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/counter', true);
    request.send(null);
};

var submit = document.getElementById('submit_btn');
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
    request.open('GET','http://aminavjith.imad.hasura-app.io/submit-name?name=' + name1, true);
    request.send(null);
};
*/
var submit1 = document.getElementById('submit_btn2');
submit1.onclick = function() {
    alert('From main.js.');
    var inputName = document.getElementById('comment');
    var comment = inputName.value;
    var inputName1 = document.getElementById('email');
    var email = inputName1.value;
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
    request.open('GET','http://aminavjith.imad.hasura-app.io/submit-comment?comment=' + comment + '||email=' + email, true);
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