
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
