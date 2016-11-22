
// Imports
var express = require('express'); // To manage the webserver like listenting on port
var morgan = require('morgan'); // To help us output logs on server 
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
	user: 'deeps09',
	database: 'deeps09',
	host: 'db.imad.hasura-app.io',
	port: '5432',
	password: 'db-deeps09-10060'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json()); // loading req.body to fetch username and password
app.use(session({
    secret: 'someRandomValueSecret',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));


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
            				<a href = "/articles/article-one">Article One</a> &nbsp; &nbsp;
				            <a href = "/articles/article-two">Article Two</a> &nbsp; &nbsp;
				            <a href = "/articles/article-three">Article Three</a>
				        </div>
				        <hr/>
				        <h1>
				            ${heading}
				        </h1>
				        
				        <div>
				            ${date.toDateString()}
				        </div>
				       
					 <div>
				            ${content}
				        </div>
			        </div>
			    </body>
			    
			</html>`

	return htmlTemplate;
}

function topicTemplate(topicId){
	var title = topicId.page_title;
	var heading = topicId.page_heading;
	var content = topicId.page_content;

	var webTemplate = `<html>
    <head>
        <link href="/ui/style.css" rel="stylesheet" />
        <TITLE> ${heading}</TITLE>
    </head>
    <body>
        <h1>
            Welcome to Android Tutorials point !!   
        </h1>

        <div class="container">
            <a href = "/">Home</a> &nbsp; &nbsp;
            <a href = "articles/article-one">Article One</a> &nbsp; &nbsp;
            <a href = "articles/article-two">Article Two</a> &nbsp; &nbsp;
            <a href = "articles/article-three">Article Three</a>
            <hr/>

        <div class="left-menu">
            <a href="/topics/activities">Activities</a> <br/> <br/>
            <a href="">Fragments</a> <br/> <br/>
            <a href="">Widgets</a> <br/> <br/>
            <a href="">Content Provider</a> <br/> <br/>
            <a href="">Shared Preferences</a> <br/> <br/>
            <a href="">Basic Layouts</a> <br/> <br/>
            <a href="">Views</a> <br/> <br/>
        </div> 
        	
        <div class="content">
        	<h2>${heading}</h2> 
			${content}	
        </div>  
        <script type="text/javascript" src="/ui/main.js">
        </script>
    </div>
    </body>
</html>`

return webTemplate;
}


var pool = new Pool(config);
app.get('/test-db', function(req, res){
	pool.query('SELECT * FROM test', function(err, result){
		if (err) {
			res.status(500).send(err.toString());
		} else{
			res.send(JSON.stringify(result.rows));
		}
	});
});

app.post('/create-user', function (req, res){
    
   var username = req.body.username;
   var password = req.body.password;
   var emailId = req.body.email;
   var flname = req.body.flname;

   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password, email_id, first_last_name) VALUES ($1, $2, $3, $4)', [username, dbString, emailId, flname], function(err, result){
      if (err){
	       res.status(500).send(err.toString());
	   } else {
	       res.send("User created successfully: " + username);
	   } 
   });
});

app.post('/login', function (req, res){
   var username = req.body.username;
   var password = req.body.password;

   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
      if (err){
	       res.status(500).send(err.toString());
	   } else {
	       if (result.rows.length === 0){
	           res.status(403).send("Username/password invalid");
	       }else{
	           var dbString = result.rows[0].password;
	           var salt = dbString.split('$')[2];
	           console.log(salt);
	           var hashedPassword = hash(password, salt);
	           if   (hashedPassword == dbString){
	               
	               // Set the session
	               req.session.auth = {userId: result.rows[0].id}
	               
	               
	               res.send("Login successfull !");
	           } else {
	               res.status(403).send("Username/password invalid");
	           }
	       }
	   } 
   }); 
});


app.get('/check-login', function(req, res){
    if  (req.session && req.session.auth && req.session.auth.userId){
        res.send('You are logged in .. ' + req.session.auth.userId.toString() );
    } else{
        res.send('You are  not logged in .. ');
    }
});

app.get('/logout', function (req, res){
   delete req.session.auth; 
   res.send('Logged Out');
});

app.get('/hash/:input', function (req, res){
    var hashedString = hash(req.params.input, 'This is some random value');
    res.send(hashedString);
});

function hash (input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

var counter = 0;
app.get('/counters', function (req, res) {
	counter = counter + 1;
	res.send(counter.toString());
});

var namelist = [];
app.get ('/submit-name', function(req, res) {
	var name = req.query.name; // fetching name value from query
	namelist.push(name);
	res.send(JSON.stringify(namelist));
});

app.get ('/articles/:articleName', function(req, res){
	var articleName = req.params.articleName;
	pool.query("SELECT * FROM articles WHERE article_name = $1", [articleName], function(err, result){
	   if (err){
	       res.status(500).send(err.toString());
	   } else {
	       if   (result.rows.length === 0){	
	           res.status(400).send("No Article found");
	       } else{
	           var resData = result.rows[0];
	           res.send(createTemplate(resData));
	       }
	   }
	});
});

app.get ('/topics/:topicid', function(req, res){
	var topicid = req.params.topicid;
	pool.query("SELECT * FROM topics WHERE page_id = $1", [topicid], function(err, result){
	   if (err){
	       res.status(500).send(err.toString());
	   } else {
	       if   (result.rows.length === 0){	
	           res.status(400).send("No Article found");
	       } else{
	           var resData = result.rows[0];
	           res.send(topicTemplate(resData));
	       }
	   }
	});
});
app.get ('/register', function(req, res){
	res.sendFile(path.join(__dirname, 'ui', 'register.html'));
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
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

// app.get('/ui/main.js', function (req, res) {
//    res.sendFile(path.join(__diename, 'ui', 'main.js')); 
// });


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
