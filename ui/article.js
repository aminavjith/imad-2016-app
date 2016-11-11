var submit2 = document.getElementById('submit-comment');
submit2.onclick = function() {
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
