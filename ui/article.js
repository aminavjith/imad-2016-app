var submit = document.getElementById('submit-comment');
submit.onclick = function() {
    alert('From article.js.');
    var inputComment = document.getElementById('comment');
    var comment = inputComment.value;
    //inputName.value = '';
   
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
                    list += '<li>' + pairs[0] + '</li>';
                    list += '<li> @' + pairs[1] + '</li><br>';
            }
            var ul = document.getElementById('listing');
            ul.innerHTML = list;
        }
    };
    request.open('GET','http://aminavjith.imad.hasura-app.io/submit-comment?comment=' + comment + '||' + new Date(), true);
    request.send(null);
};
