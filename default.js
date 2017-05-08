//*******************************************************************
//
//   File: default.js     Assignment No.: Final Project
//
//   Author: Luke Dobson      Email: luke.dobson@yale.edu
//
//   --------------------
//      Implements a game of hangman for the web.
//
//*******************************************************************
//initializing the game when the page loads
window.onload = function() {
	newGame();
	document.getElementById("button").onclick = guessLetter;
	document.getElementById("reset1").onclick = newGame;

	//focusing the input on the textbox
	document.getElementById("guessinput").focus();

	//prevents hitting "enter" while in the textbox from refreshing the page
	$(':input:not(textarea)').keypress(function(event) { 
		return event.keyCode != 13;
	});
	
	//allowing the enter button to submit the guess
	document.getElementById("guessinput").addEventListener('keypress', function(event) {
		if (event.keyCode == 13) {
			guessLetter();
		}
	});
}

//declaring all of the variables
var word;
var lives;
var currentWord;
var input;
var wordLength;
var dictionaryURL = "https://raw.githubusercontent.com/sindresorhus/word-list/master/words.txt"
var drawArray = [step9, step8, step7, step6, step5, head, step4, step3, step2, step1];

//initializing a new game
function newGame() {
	//clearing canvas
	canvas();
	context.clearRect(0, 0, 400, 400);

	//initializing variables and picking word
	currentWord = "";
	lives = 10;
	word = getWord().toLowerCase();
	wordLength = word.length;

	//creating the spaces in the placeholder
	for (var i = 0; i < word.length; i++) {
		currentWord = currentWord + "-";
	}

	//displaying the mystery word & the number of lives
	showWord(currentWord);
	showLives(lives);
}

//this method is called each time a letter is guessed
function guessLetter() {
	//getting the user's input
	var inputBox = document.getElementById("guessinput");
	input = inputBox.value.toLowerCase();

	//assume there are no instances of the user's letter in the word
	var correct = false;

	//looks for instances of the user's letter in the word
	for (var i = 0; i < wordLength; i++) {
		if (input == word.substring(i, i + 1)) {     
			correct = true;
			currentWord = currentWord.substring(0, i) + input + currentWord.substring(i + 1, currentWord.length + 1);
			showWord(currentWord);
		}
	}

	//if there are no instances of the user's letter, then decrease the number of lives by one.
	if (!correct) {
		lives--;
	}

	//update the canvas & the number of lives
	animate();
	showLives(lives);

	//display message if the game is won
	if (currentWord == word && lives > 0) {
		alert("You guessed the word correctly. You win!");
	}

	//display message if the game is lost
	if (lives == 0) {
		alert("You've lost.  The correct word was '" + word + "'.  Click 'Reset' to start a new game!");

		currentWord = word; 
		showWord(currentWord);
	}

	//clearing a user's input
	resetForm();
}

//update the word given what it should be
function showWord(current) {
	document.getElementById("placeholder").innerHTML = current;
}

//update the number of lives given how many lives there should be
function showLives(lives1) {
	if (lives1 >= 0) {
		document.getElementById("lives").innerHTML = "You have " + lives1 + " lives left.";
	} else {
		document.getElementById("lives").innerHTML = "You have 0 lives left.";
	}
}

//clearing a user's input
function resetForm() {
	var form = document.getElementById("main-form");
	form.reset();
}

//updating the canvas
function animate() {
	if (lives >= 0) {
		var step = drawArray[lives];
		step();
	}
}

//setting the default drawing setting
function canvas() {
	manFigure = document.getElementById("hangmanimage");
	context = manFigure.getContext('2d');
	context.beginPath();
	context.strokeStyle = "#FC575E";
	context.lineWidth = 2;
}

//drawing the head
function head() {
	canvas();
	context.beginPath();
	context.arc(60,25,10,0,Math.PI*2,true);
	context.stroke();
}

//drawing a line between 2 points
function draw(x1, y1, x0, y0) {
	canvas();
	context.moveTo(x1, y1);
	context.lineTo(x0, y0);
	context.stroke();
}

//drawing the first part
function step1() {
	draw(0, 149, 150, 149);
}

//drawing the second part
function step2() {
	draw(10, 0, 10, 600);
}

//drawing the third part
function step3() {
	draw(0, 5, 60, 5);
}

//drawing the fourth part
function step4() {
	draw(60, 5, 60, 15);
}

//drawing the first part of the body
function step5() {
	draw(60, 36, 60, 70);
}

//drawing the second part of the body
function step6() {
	draw(60, 46, 90, 50);
}

//drawing the third part of the body
function step7() {
	draw(60, 46, 30, 50);
}

//drawing the fourth part of the body
function step8() {
	draw(60, 70, 85, 100);
}

//drawing the fifth part of the body
function step9() {
	draw(60, 70, 35, 100);
}

//getting a word by accessing an online dictionary
function getWord() {
	var data = $.ajax({
		type: 'get',
		url: dictionaryURL,
		dataType: 'text',
		global: false,
		async: false,
		success: function(data) {
			return data;
		}
	}).responseText;
	var actualWord = processData(data);
	//console.log(actualWord);
	return actualWord;
}

//creating an array with all of the words and randomly picking a word
function processData(data) {
	var wordList = data.split("\n");
	var wordActual = wordList[Math.floor(Math.random() * wordList.length)];
	return wordActual;
}

//displaying a popup when someone clicks the contact button
function contact() {
	alert("This project was created by Luke Dobson for CPSC 112 at Yale University. " +  
		" All questions should be directed to luke.dobson@yale.edu.")
}