loadLogin();
//check-login
function loadLogin() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
             console.log('User logged in.');
          } else{
             var newHTML =`
             <br>
             <h3>Please login from <span href="/"> HOME</span> to be able to create an article</h3>
             <br>
             <hr>`;
             var bodyx = document.getElementById('bodyx');
             bodyx.innerHTML = newHTML;
          }
        }
    };
    request.open('GET', 'http://aminavjith.imad.hasura-app.io/check-login', true);
    request.send('null');
}

var submit6 = document.getElementById('save-article');
submit6.onclick = function(){
    var heading = document.getElementById('heading').value;
    var content = document.getElementById('content').value;
     if(heading === '' || content === ''){
        alert('Please enter heading and content in order be able to save this article.');
    } else {
        var upHeading = heading.toUpperCase();
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var newHTML =`
                 <br>
                 <h3>New article was created successfully.</h3>
                 <br>
                 <hr>
                 <form action="/ui/create-article.html/"> 
                    <button type="submit" id="create-article" class="submit5">Click to create another article</button>
                 </form> `;
                var bodyx = document.getElementById('bodyx');
                bodyx.innerHTML = newHTML;
            } else {
                console.log(request.responseText);
                alert('Very sorry, but we are not able to save the article.');
            }
        }
    };
    request.open('POST', 'http://aminavjith.imad.hasura-app.io/save-article', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({heading: upHeading, content: content}));
    request.responseType = 'text';
}};


