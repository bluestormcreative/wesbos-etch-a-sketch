const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const moveAmt = 30;
const shakeBtn = document.querySelector('.shake');

// Destructure the size vars from the canvas object.
const { width, height } = canvas;

// Set up the properties necessary for canvas context.
ctx.lineWidth = 10;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Create position and color vars.
let x;
let y;
let hue;

// Set up the first dot.
function setStartPosition() {
	// Position the dot randomly in the canvas.
	x = Math.floor(Math.random() * width);
	y = Math.floor(Math.random() * height);

	// Set/reset color to red.
	hue = 0;
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

	// Draw the dot. These are all part of the canvas API.
	// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x, y);
	ctx.stroke();
}

// Destructure an "options" object into one with a 'key' property
function draw({ key }) {
	// Create a rainbow line by changing the hue each time we draw.
	hue = hue + 5;
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

	// Start to draw.
	ctx.beginPath();
	ctx.moveTo(x, y);

	// Change direction based on key presses.
	switch (key) {
		case 'ArrowUp':
			y -= moveAmt;
			break;
		case 'ArrowDown':
			y += moveAmt;
			break;
		case 'ArrowRight':
			x += moveAmt;
			break;
		case 'ArrowLeft':
			x -= moveAmt;
			break;
		default:
			break;
	}

	// Complete the line.
	ctx.lineTo(x, y);
	ctx.stroke();
}

function handleKeys(event) {
	// Only listen for arrow keys.
	if (event.key.includes('Arrow')) {
		// Don't scroll the page.
		event.preventDefault();
		// Pass the key press to the draw event "options" object.
		// Call the draw function with each key press.
		draw({ key: event.key });
	}
}

function shakeCanvas() {
	canvas.classList.add('shake');
	canvas.addEventListener(
		'animationend',
		function () {
			// Clear the canvas.
			ctx.clearRect(0, 0, width, height);
			canvas.classList.remove('shake');
			setStartPosition();
		},
		{ once: true } // Only run this function once, auto-removes the eventlistener.
	);
}

// Set start position on load.
window.addEventListener('load', setStartPosition);

// Listen for arrow keys.
window.addEventListener('keydown', handleKeys);

// Listen for shake button click.
shakeBtn.addEventListener('click', shakeCanvas);
