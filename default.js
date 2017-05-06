var wordsArray = ["monitor", "program", "application", "keyboard", "javascript", "gaming", "network"];
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
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    word = letter().toLowerCase();
    //currentWord = 0;
    //word = wordsArray[currentWord];
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

var letter = function() {
	$.ajax({
	    type: "GET",
	    url: "dictionary.txt",
	    dataType: "text",
	    success: function(data) {
	      processData(data);
	    }
  	});


	return process;

}

var XMLHttpRequestObject = false; 
 
      if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
      }
 
      function getData(dataSource, divID) 
      { 
	  
        if(XMLHttpRequestObject) {
          var obj = document.getElementById(divID); 
          XMLHttpRequestObject.open("GET", dataSource); 
 
          XMLHttpRequestObject.onreadystatechange = function() 
          { 
            if (XMLHttpRequestObject.readyState == 4 && 
              XMLHttpRequestObject.status == 200) { 
                obj.innerHTML = XMLHttpRequestObject.responseText; 
            } 
          } 
 
          XMLHttpRequestObject.send(null); 
        }
      }

var process = function processData(allText) {
		var wordList = allText.split(/\r\n|\n/);
		var lett = wordList[Math.floor(Math.random() * wordList.length)];
		return lett;
	}
window.onload = function() {
	newGame();
	document.getElementById("button").onclick = guessLetter;
	document.getElementById("reset1").onclick = newGame;
}