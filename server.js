var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Articles={
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
      </head>
      <div class="header">${heading}
        <br>
        <a href="/ui/index.html">Home
        </a>
        <hr>
      </div>
      <div class="bodyx">
        ${date}<br>
        ${content}
       <hr>
      </div>
    </html>`;
    return HTMLTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleName', function(req, res){
    var articleName= req.params.articleName;
    res.send(createTemplate(Articles(articleName)));
});
app.get('/article-two', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
