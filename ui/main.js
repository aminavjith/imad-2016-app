
var button = getElementById('button1');
var counter = 0;
button.onclick = function() {
    counter = counter + 1;
    var span = getElementById('count');
    span.innerHTML = counter.toString();
}









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