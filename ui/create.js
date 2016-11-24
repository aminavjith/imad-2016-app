loadLogin();
//check-login
function loadLogin() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
             console.log('User logged in.');
          } else{
             var newHTML ='
             <a href="/" text-align="right">Home</a>
             <h3>Please login  by going <span href="/"> HOME</span> to be able to create an article</h3>
             <br>
             <hr>';
             var bodyx = document.getElementById('bodyx');
             bodyx.innerHTML = newHTML;
          }
        }
    };
    request.open('GET', 'http://aminavjith.imad.hasura-app.io/check-login', true);
    request.send('null');
}
