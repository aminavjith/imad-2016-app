console.log('Loaded!');
alert('From main.js.');

var element = document.getElementById('text1');
function myFunction() {
    document.getElementById("demo").style.color = "red";
}
element.innerHTML = 'Amritha Navjith';


var move = document.getElementById('img1');

move.ondblclick = function() {
    alert('From 1');
    //move.style.marginLeft = '100px';
    //alert('From 2.main.js.');
};

