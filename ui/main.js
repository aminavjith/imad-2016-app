console.log('Loaded!');
alert('From main.js.');

var element = document.getElementById('text1');
element.innerHTML = 'Amritha Navjith';

var move = document.getElementById('img1');
move.onclick = function() {
    move.style.marginLeft = '100px';
};

