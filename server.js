var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;

var config = {
    user : 'aminavjith',
    database : 'aminavjith',
    host: 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
        title:'Article One',
        heading:'Article One',
        date:'1 September, 2016',
        content:`<p> This is the content of article one. It is just dummy article. Please bear.
        This is the content of article one. It is just dummy article. Please bear.</p>
        <p> This is the content of article one. It is just dummy article. Please bear.
        This is the content of article one. It is just dummy article. Please bear.</p>`},
    'article-two':{
        title:'Article Two',
        heading:'Article Two',
        date:'10 September, 2016',
        content:`<p> This is the content of article two. It is just dummy article. Please bear.
        This is the content of article two. It is just dummy article. Please bear.</p>
        <p> This is the content of article two. It is just dummy article. Please bear.
        This is the content of article two. It is just dummy article. Please bear.</p>
        <p> This is the content of article two. It is just dummy article. Please bear.
        This is the content of article two. It is just dummy article. Please bear.</p>`},
    'article-three':{
        title:'Article Three',
        heading:'Article Three',
        date:'20 September, 2016',
        content:`<p> This is the content of article three. It is just dummy article. Please bear.
        This is the content of article three. It is just dummy article. Please bear.</p>
        <p> This is the content of article three. It is just dummy article. Please bear.
        This is the content of article three. It is just dummy article. Please bear.</p>
        <p> This is the content of article three. It is just dummy article. Please bear.
        This is the content of article three. It is just dummy article. Please bear.</p>
        <p> This is the content of article three. It is just dummy article. Please bear.
        This is the content of article three. It is just dummy article. Please bear.</p>`}
};

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
        ${date}<br>
        ${content}
       <hr>
      </div>
      <textarea type="text" placeholder="Enter your comment here." id="comment" cols="50" rows="5"></textarea><br>
      <input type="text" id="email" placeholder="Email address"/><br><br>
      <input type="Submit" id="submit_btn2"/>
      <ul id="listing">
      </ul>
      <script type="text/javascript" src="/ui/main.js">
      </script>
     </html>`;
    return HTMLTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/db-test', function (req, res){
    pool.query('SELECT * FROM TEST', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname,'favicon.ico'));
});

var counter = 0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
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

app.get('/:articleName', function(req, res){
    var articleName= req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
