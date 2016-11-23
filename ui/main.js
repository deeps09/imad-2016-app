

// var button = document.getElementById("counter_btn");

// button.onclick = function() {

// 	// create a request object
// 	var request = new XMLHttpRequest();

// 	// capture the response and store it in a variable
// 	request.onreadystatechange = function() {
// 		if (request.readyState === XMLHttpRequest.DONE) {

// 			if (request.status === 200) {
// 				var counter = request.responseText;
// 				var span = document.getElementById("count");
// 				span.innerHTML = counter.toString();
// 			}
// 		}
// 	};

// 	request.open('GET', 'http://localhost:8080/counters', true);
// 	request.send(null);

// };

// var sumbit = document.getElementById("submit_btn");

// sumbit.onclick = function() {
// 	var namebox = document.getElementById("name");
// 	var name = namebox.value;
// /*	var names = ['name1', 'name2', 'name3', 'name4', 'name5'];
// 	var list = '';*/
// 	var list = [];
// 	var request = new XMLHttpRequest();

// 	// capture the response and store it in a variable
// 	request.onreadystatechange = function() {
// 		if (request.readyState === XMLHttpRequest.DONE) {

// 			if (request.status === 200) {
// 				var names = request.responseText;
// 				names = JSON.parse(names);
// 				for (var i = 0; i < names.length ; i++) {
// 					list = list + '<li>' + names[i] + '</li>';
// 				}

// 				var namelist = document.getElementById('nameList');
// 				namelist.innerHTML = list;
// 			}
// 		}
// 	}

// 	request.open('GET', 'http://localhost:8080/submit-name?name=' + name, true);
// 	request.send(null);
// };


// // Submit username/password to login
// var sumbitBtn = document.getElementById('submitBtn');

// submitBtn.onclick = function(){
    
//     // create a request object
//     var request = new XMLHttpRequest();
    
//     request.onreadystatechange = function () {
//       if (request.readyState === XMLHttpRequest.DONE){
        
//         if (request.status === 200){
//             console.log("User logged on successfully");
//             alert('Login Successfull !');
//         } else if (request.status === 403){
//             console.log("Invalid username/password");
//             alert('Login Un-successfull !');
//         } else if (request.status === 500){
//             alert('Something went wrong on server !');
//         }
//       }
//     };
    
    
// var username = document.getElementById("username").value;
// var password = document.getElementById("password").value;
// console.log("Username = " + username + "," + "Password = " + password);

// request.open('POST', 'http://deeps09.imad.hasura-app.io/login', true);
// request.setRequestHeader('Content-Type', 'application/json');
// request.send(JSON.stringify({'username': username, 'password': password}));
// };



//Submit username/password to login from home page
getLogin();	
var loginBtn = document.getElementById("login_btn");

loginBtn.onclick = function(){
    
    // create a request object
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function (res) {
      if (request.readyState === XMLHttpRequest.DONE){
        
        if (request.status === 200){
            console.log("User logged on successfully");
            alert("Logged On");
            getLogin();
            //userinfo.innerHTML = httpGet('http://localhost:8080/check-login');
            alert('Login Successfull !');
        } else if (request.status === 403){
            console.log("Invalid username/password");
            alert('Login Un-successfull !');
        } else if (request.status === 500){
            alert('Something went wrong on server !');
        }
      }
    };
    
    
var username = document.getElementById("uid").value;
var password = document.getElementById("pwd").value;
console.log("Username = " + username + "," + "Password = " + password);

request.open('POST', '/login', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({'username': username, 'password': password}));
};


// Get login details on load

function getLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCurrentUser(this.responseText);
            } else {
                userInfo.style.display = "none";
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

var curUser = document.getElementById("user");
var userInfo = document.getElementById("user-info");
var logOffBtn = document.getElementById("logoff_btn");

function loadCurrentUser (username) {
	userInfo.style.display = "block";
    userInfo.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}


logOffBtn.onclick = function(){
	var request = new XMLHttpRequest();
	request.open('GET', '/logout', true);
	request.send(null);
}



// User registration from register.html

var registerBtn = document.getElementById('reg_btn');
var label_msg = document.getElementById('label_msg');
registerBtn.onclick = function(){
   
    // create a request object
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE){
        
        if (request.status === 200){
        	resetFields();
            label_msg.innerHTML = 'User is successfully registered'; 
            label_msg.style.color = "#2C3E50"; 
        } else if (request.status === 500){
            label_msg.innerHTML = 'Something went wrong on server. Please try again with different credentials !'; 
            label_msg.style.color = "red";
        }
      }
    };
    
 
var flname =   document.getElementById("fl_name").value;
var emailId =   document.getElementById("email_id").value;
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

if (flname === "" || emailId === "" || username === "" || password === "") {
	label_msg.innerHTML = "All fields are mandatory."
	label_msg.style.color = "red";
} else {
		request.open('POST', '/create-user', true);
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(JSON.stringify({'username': username, 'password': password, 'flname': flname, 'email': emailId}));
	}
};


var regResetBtn = document.getElementById('reg_reset_btn');

regResetBtn.onclick = function(){
	resetFields();
}


// function to reset controls on webpage
function resetFields() {
var flname =   document.getElementById("fl_name");
var emailId =   document.getElementById("email_id");
var username = document.getElementById("username");
var password = document.getElementById("password");

flname.value = emailId.value = username.value = password.value = "";
label_msg.innerHTML = "";

}




/*console.log('Loaded!');

// Change the text
var element = document.getElementById("main-text");
//element.innerHTML = "This is changed by Javascript";

element;

// Make image moving
var img = document.getElementById("madi");
var marginLeft = 0;
var marginRight = 0;

function moveRight() {
	if (marginLeft < 300){
		marginLeft = marginLeft + 3;
		img.style.marginLeft = marginLeft + 'px';
	} 
}

function moveLeft(){
	if (marginRight < 300) {
		marginRight = marginRight + 3;
		img.style.marginRight = marginRight + 'px'
	}
}

img.onclick = function() {
	//img.style.marginLeft = "200px";

	if (marginRight >= 300 && marginRight >= 300) {
		marginRight = 0;
		marginLeft = 0;
	}

	if (marginLeft >= 300) {
		// Moving left
		setInterval(moveLeft, 50);
		
	} else {
		// Moving right
		setInterval(moveRight, 50);
		
	}
};
*/