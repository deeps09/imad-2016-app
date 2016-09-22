console.log('Loaded!');

// Change the text
var element = document.getElementById("main-text");
element.innerHTML = "This is changed by Javascript";

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
