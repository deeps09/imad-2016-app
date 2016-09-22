
// Imports
var express = require('express'); // To manage the webserver like listenting on port
var morgan = require('morgan'); // To help us output logs on server 
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one' : {
		title: "Article One | Deepesh Gupta",
		heading: "Article One",
		date: "Dated: 18th Sept 2016",
		content:
			`<p>
	                This is my first article on IMAD course.
	                I got to know about this course from newspaper and was very exited about its commencement.
	                So far I am able to understand each and every thing clearly and will try follow along all the stuffs that I have learned
	                from this forum.
	            </p>
	            
	            <p>
	                I have also enrolled myself for the certification exam being coonducted by IIT Madras.
	                Such certification is very valuable for students who cannot directly qualify to study in these insititutions
	                as they have very limited seats and ofcoure you have to be outstanding student to get admitted.
	            </p>
	            
	            <p>
	                I am very keen to learn Android devlopment as I have some prior experience in C#.net and Object Oriented Programming 
	                Language, so I am very pleased to attend this session and want to thanks the faculty members and everyone who is directly
	                or inderctly involved in making this course live.
	        </p>`

	},

 'article-two' : {
	title: "Article Two | Deepesh Gupta",
	heading: "Article Two",
	date: "Dated: 18th Sept 2016",
	content:
			`<p> This is my second article.. the data is awaited and will be served soon. </p>
              <h2> Thanks you for your patience !!</h2>
            `
},


 'article-three' : {
	title: "Article Three | Deepesh Gupta",
	heading: "Article Three",
	date: "Dated: 18th Sept 2016",
	content:
			`<p> This is my Third article.. the data is awaited and will be served soon. </p>
              <h2> Thanks you for your patience !!</h2>
            `
}
	};

function createTemplate (data){
	var title = data.title;
	var heading = data.heading;
	var date = data.date;
	var content = data.content;

	var htmlTemplate = 
					` <html>
			    
			    <head>
			    <title>
			        ${title}
			    </title>
			        <meta name="viewport" content="width=device-width, initialsscale=1">
			        <link href="/ui/style.css" rel="stylesheet" />
			    </head>
			    
			    <body>
			    	<div class="container">
				        <div>
				            <a href = "/">Home</a> &nbsp; &nbsp;
				            <a href = "/article-one">Article One</a> &nbsp; &nbsp;
				            <a href = "/article-two">Article Two</a> &nbsp; &nbsp;
				            <a href = "/article-three">Article Three</a>
				        </div>
				        <hr/>
				        <h1>
				            ${heading}
				        </h1>
				        
				        <div>
				            ${date}
				        </div>
				       
					 <div>
				            ${content}
				        </div>
			        </div>
			    </body>
			    
			</html>`

	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get ('/:articleName', function(req, res){
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});

/*
app.get('/article-one', function (req, res){
  res.send(createTemplate(articles.articleOne));
});

app.get('/article-two', function (req, res){
    res.send(createTemplate(articles.articleTwo));
});

app.get('/article-three', function (req, res){
    res.send(createTemplate(articles.articleThree));
});*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
   res.sendFile(path.join(__diename, 'ui', main.js)); 
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
