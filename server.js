var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
const crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
  user: 'aminavjith',
  database: 'aminavjith',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};
var pool = new Pool(config);
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
  secret: 'Somerandomvalue',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  resave: true, 
  saveUninitialized: true
}));


function createArticleTemplate(data) {
  var title = data.title;
  var heading = data.heading;
  var date = data.date;
  var content = data.content;
  var HTMLTemplate =
    `<html>
      <head>
        <title>
          ${heading}
        </title>
        <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no" />
        <link  href="/ui/style.css" rel="stylesheet" />
        <link  href="favicon.ico" rel="icon" />
      </head>
      <body>
        <div class = "header">
            <a href="/">
                <img id="img1" src="/ui/logo.jpg" style="height:50px; width:50px;"/>
            </a>
            <div id="text1" class="header"> Learning to create webapps
            </div>
            <body1 id="login">
                <div id="userarea" class="header"> Username <br>
                    <input placeholder="Username" id="username" type="name"/> <br>
                </div>
                <div id="passwordarea" class="header"> Password: <br>
                    <input placeholder="Password" id="password" type="password" />
                </div>
                <input type="button" id="submit-user" class="submit1" value="Login"/>
                <input type="button" id="register" class="submit2" value="Register"/>
            </body1>
            <body2 id="logout" style="display:none;">
                <div id="userarea" class="header"> You are now signed in. <br>
                    <input type="button" id="logout-user" class="submit3" value="Log Out"/>
                 </div>
            </body2>
        </div>
      <br>
      <div class="bodyx">
        
        <h3>${heading}</h3>
        <br>
        <hr>
        ${date.toDateString()}<br>
        ${content}
        <hr>
        <div id="commentform" style="display:none;">
            <p>Enter your comments here please:</p>
            <textarea type="text" placeholder="Enter your comment here." id="comment" cols="50" rows="5"/></textarea><br>
            <input type="button" id="submit-comment" class="submit4" value="Submit Comment"/>
        </div>
        <p>Comments appear below:</p>
        <ul id="listing">
        </ul>
      </div>
     </body>
      <script type="text/javascript" src="/ui/article.js">
      </script>
     </html>`;
  return HTMLTemplate;
}

function hash(input, salt) {
  var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
  return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

//endpoint to create new user
app.get('/register/', function(req, res) {
  console.log('server');
  var username = req.query.username;
  var details = username.split('||');
  username = details[0];
  pool.query('SELECT * FROM usernames WHERE username = $1',[username], function(err, result){
      if (err){
        res.status(500).send(err.toString());
      } else{
        if(result.rows.length !== 0){
            res.send(JSON.stringify('Username: ' + username + ' already exists.'));
        } else{
            var password = details[1];
            var salt = crypto.randomBytes(128).toString('hex');
            var dbString = hash(password, salt);
            pool.query('INSERT INTO usernames (username, password) VALUES ($1, $2);', [username, dbString], function(err, result) {
                if (err) {
                  res.status(500).send(err.toString());
                } else {
                  res.send(JSON.stringify('Username: ' + username + ' created successfully'));
                }
            });
        }
      }});
});

//endpoint to login to the app
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  pool.query('SELECT * FROM usernames WHERE username = $1;', [username], function(err, result) {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      if (result.rows.length === 0) {
        res.send(403).send('Username/ password doesnot exist');
      } else {
        var dbString = result.rows[0].password;
        var salt = dbString.split('$')[2];
        var hashedPassword = hash(password, salt);
        if (dbString === hashedPassword) {
          req.session.auth = {
            userId: result.rows[0].id};
          res.send(JSON.stringify('Logged in successfully'));
        } else {
          res.send(JSON.stringify('Invalid creds.'));
        }
      }
    }
  });
});

//endpoint to check login
app.get('/check-login', function(req, res) {
  if (req.session && req.session.auth && req.session.auth.userId) {
    // Load the user object
    pool.query('SELECT * FROM usernames WHERE id = $1', [req.session.auth.userId], function(err, result) {
      if (err) {
        res.status(500).send(err.toString());
      } else {
        res.send(result.rows[0].username);
      }
    });
  } else {
    res.status(400).send('You are not logged in yet');
  }
});

//endpoint to logout of the session
app.get('/logout/', function(req, res) {
  delete req.session.auth;
  res.send('You are logged out.');
});

//endpoint to retrieve comments
app.get('/load-comments/:articleId', function(req, res) {
  //var articleName= req.params.articleName;
  pool.query("SELECT comments.comment, comments.timestamp, usernames.username FROM comments, usernames, article WHERE comments.user_id = usernames.id AND comments.article_id=article.id AND article.id = $1 ORDER BY timestamp DESC", [req.params.articleId], function(err, result) {
    if (err) {
      res.status(500).send(err.toString());
    } else if (result.rows.length === 0) {
      res.status(404).send('No comments posted');
    } else {
      var articleData = result.rows;
      res.send(JSON.stringify(articleData));
    }
  });
});

//endpoint to display list of articles
app.get('/listing', function(req, res) {
  pool.query("SELECT id, title, heading FROM article", function(err, result) {
    if (err) {
      res.status(500).send(err.toString());
    } else if (result.rows.length === 0) {
      res.status(404).send('No articles found');
    } else {
      var articleList = result.rows;
      res.send(JSON.stringify(articleList));
    }
  });
});

//endpoint to display article
app.get('/articles/:articleName', function(req, res) {
  //var articleName= req.params.articleName;
  pool.query("SELECT * FROM article WHERE id = $1", [req.params.articleName], function(err, result) {
    if (err) {
      res.status(500).send(err.toString());
    } else if (result.rows.length === 0) {
      res.status(404).send('File Not Found.');
    } else {
      var articleData = result.rows[0];
      res.send(createArticleTemplate(articleData));
    }
  });
});

//to save comment
app.post('/submit-comment/:articleId', function(req, res) {
  var commentValue = req.body.comment;
  var article_id = req.params.articleId;
  date = new Date();
  pool.query("INSERT INTO comments (article_id, comment, user_id, timestamp) VALUES ($1, $2, $3, $4);", [article_id, commentValue, req.session.auth.userId, date], function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send('Comment submitted successfully');
        }
  });
});

//to save article
app.post('/save-article/', function(req, res) {
  var heading = req.body.heading;
  var content = req.body.content;
  var date = new Date();
  pool.query("INSERT INTO article (heading, date, content) VALUES ($1, $2, $3);", [heading, date, content], function(err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        res.send('Article created successfully');
    }
  });
});

app.get('/hash/:input', function(req, res) {
  hashedString = hash(req.params.input, 'this-is-some-random-string');
  res.send(hashedString);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('/ui/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/article.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});

app.get('/ui/create.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'create.js'));
});

app.get('/ui/create-article.html/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'create-article.html'));
});

app.get('/ui/about-me.html/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about-me.html'));
});

app.get('/ui/test.html/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'test.html'));
});

app.get('/ui/test.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'test.js'));
});

app.get('/ui/learn_code.jpg', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'learn_code.jpg'));
});

app.get('/ui/logo.jpg', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function() {
  console.log(`IMAD course app listening on port ${port}!`);
});
