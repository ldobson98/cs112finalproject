var word;
var goesLeft;
var placeholder;
var input;
var wordLength;
var wordSubstring;
var currentWord = 0;

  function newGame()
  {
  	//clearing canvas
  	canvas();
  	context.clearRect(0, 0, 400, 400);

    placeholder = "";
    goesLeft = 10;
    word = getWord().toLowerCase();
    //console.log(word);

    wordLength = word.length;
    wordSubstring = currentWord.substring;
    console.log(word);
    var myElement = document.getElementById("button").innerHTML = "Click to guess";

    for (var count = 0; count < word.length; count++)
    {
      placeholder = placeholder + "-";
    }

    document.getElementById("placeholder").innerHTML = placeholder;

  }

  function guessLetter()
  {
    var correct = 0;

    var inputBox = document.getElementById("guessinput");
    input = inputBox.value.toLowerCase();

    for (var count = 0; count < wordLength; count++)
    {
      if (input == word.substring(count, count + 1))
      {     
        correct++;
        placeholder = placeholder.substring(0, count) + input + placeholder.substring(count + 1, placeholder.length + 1);
        document.getElementById("placeholder").innerHTML = placeholder;
      }
    }

    if (correct == 0)
    {
      goesLeft--;
    }
    animate();

    if (placeholder == word)
    {
      alert("You guessed the word correctly. You win!");
      currentWord++;
    }

    if (goesLeft == 0)
    {
      animate();
      alert("You've lost.  The correct word was '" + word + "'.");
      currentWord++;
    }
  }

  //animating the hangman
	animate = function () {
		var step = drawArray[goesLeft];
		step();
	}

	//doing the canvas
	canvas = function () {
		manFigure = document.getElementById("hangmanimage");
		context = manFigure.getContext('2d');
		context.beginPath();
		context.strokeStyle = "#000000";
		context.lineWidth = 2;
	};

	head = function () {
		canvas();
		context.beginPath();
		context.arc(60,25,10,0,Math.PI*2,true);
		context.stroke();
	}

	draw = function (x1, y1, x0, y0) {
		canvas();
		context.moveTo(x1, y1);
		context.lineTo(x0, y0);
		context.stroke();
	}

	//base
	step1 = function () {
		draw(0, 150, 150, 150);
	};

	step2 = function () {
		draw(10, 0, 10, 600);
	};

	step3 = function () {
		draw(0, 5, 60, 5);
	};

	step4 = function () {
		draw(60, 5, 60, 15);
	};

	//body
	step5 = function () {
		draw(60, 36, 60, 70);
	};

	step6 = function () {
		draw(60, 46, 100, 50);
	};

	step7 = function () {
		draw(60, 46, 20, 50);
	};

	step8 = function () {
		draw(60, 70, 100, 100);
	};

	step9 = function () {
		draw(60, 70, 20, 100);
	};

	drawArray = [step9, step8, step7, step6, step5, head, step4, step3, step2, step1];

// letter = function() {
// 	var thisOne = tryMe;
// 	return thisOne;
// }

// tryMe = function() {
// 	var test;
// 	$.ajax({
// 		async: "false",
// 	    type: "GET",
// 	    url: "https://raw.githubusercontent.com/sindresorhus/word-list/master/words.txt",
// 	    dataType: "text",
// 	    success: function(data) {
// 	      test = processData(data);
// 	      console.log(test);
// 	    }
//   	});
//   	console.log(test);

//   	return test;
// }();

getWord = function() {
	var data = $.ajax({
	    type: 'get',       
	    url: "https://raw.githubusercontent.com/sindresorhus/word-list/master/words.txt",
	    dataType: 'text',
	    global: false,
	    async:false,
	    success: function(data) {
	        return data;
    	}
	}).responseText;
	var actualWord = processData(data);
	//console.log(actualWord);
	return actualWord;

}

	function processData(data) {
		var wordList = data.split("\n");
		var wordActual = wordList[Math.floor(Math.random() * wordList.length)];
		return wordActual;

	}

window.onload = function() {
	newGame();
	document.getElementById("button").onclick = guessLetter;
	document.getElementById("reset1").onclick = newGame;
}

contact = function() {
	alert("This project was created by Luke Dobson for CPSC 112 at Yale University. " +  
		" All questions should be directed to luke.dobson@yale.edu.")
}