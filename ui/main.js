console.log('Loaded!');
alert('From main.js.');

var element = document.getElementById('text1');
element.innerHTML = 'Amritha Navjith';


var img = document.getElementById('img1');

var marginLeft=0;
function moveRight(){
  marginLeft = marginLeft + 1;
  img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
  var interval= setInterval(moveRight,50);
  if (marginLeft > 300){
      clearInterval(interval);
  }
  
};

