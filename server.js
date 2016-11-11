var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
const crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user : 'aminavjith',
    database : 'aminavjith',
    host: 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'Somerandomvalue',
    cookie: {maxAge: 1000 * 60 *60 *24 *30}
}));

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var HTMLTemplate=
    `<html>
      <head>
        <title>
          ${title}
        </title>
        <link  href="/ui/style.css" rel="stylesheet" />
        <link  href="/favicon.ico" rel="icon" />
      </head>
      <div class="header">${heading}
        <br>
        <a href="/">Home
        </a>
        <hr>
      </div>
      <div class="bodyx">
        ${date.toDateString()}<br>
        ${content}
       <hr>
      </div>
      <textarea type="text" placeholder="Enter your comment here." id="comment" cols="50" rows="5"></textarea><br>
      <input type="Submit" id="submit-comment"/>
      <ul id="listing">
      </ul>
      
      <script type="text/javascript" src="/ui/article.js">
      </script>
     </html>`;
    return HTMLTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res){
    pool.query('SELECT * FROM test1', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname,'favicon.ico'));
});



var names = [];
app.get('/submit-comment/', function(req, res){
    var name = req.query.comment;
    names.push(name);
    res.send(JSON.stringify(names));
});

var names = [];
app.get('/submit-name/', function(req, res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req, res){
    //var articleName= req.params.articleName;
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){
        if (err) {
            res.status(500).send(err.toString());
        } else if (result.rows.length === 0){
            res.status(404).send('File Not Found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    });
});

/*app.get('/submit-comments/:s, function(req, res){
        var comment = req.body.username;
        var timestamp = req.body.password;
      pool.query('INSERT INTO "comments" (comment, timestamp) VALUES ($1, $2);', [comment,timestamp], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('Username: ' + username + 'created successfully');
        }
    });
//}*/
function hash(input, salt){    
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
  hashedString = hash(req.params.input, 'this-is-some-random-string');
  res.send(hashedString);
});

app.post('/user-name', function (req, res){
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "usernames" (username, password) VALUES ($1, $2);', [username,dbString], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('Username: ' + username + 'created successfully');
        }
    });
});


app.post('/login', function (req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "usernames" WHERE username = $1;', [username], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if (result.rows.length === 0){
                res.send(403).send('Username/ password is invalid');
            }else{
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(dbString === hashedPassword){
                    req.session.auth = {userId: result.rows[0].id};
                    res.send('Logged in successfully'); 
                } else{
                    res.send('Invalid creds.'); 
                }
            }
        }
    });
});

app.get('/check-login', function (req, res){
    if(req.session && req.session.auth && req.session.auth.userId)
    {
        res.send('You are logged in with '+ req.session.auth.userId.toString()); 
    }
    else
    {
        res.send('You are not logged in.');
    }
});


app.get('/logout', function (req, res){
    delete req.session.auth;
    res.send('You are logged out.'); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
