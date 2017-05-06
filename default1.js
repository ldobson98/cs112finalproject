window.onload = function () {
	//declaring lots of variables :)
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
				   'h', 'i', 'j', 'k', 'l', 'm', 'n',
				   'o', 'p', 'q', 'r', 's', 't', 'v',
				   'w', 'x', 'y', 'z'];
	var word; 			//this'll be the selected word
	var guess;			//this'll be the letter guessed
	var guesses = [ ];	//all of the stored guesses to avoid repeats
	var chances;		//number of lives/changes left
	var count;			//counts the number of correct guesses
	var spaces;			//counts the number of unfilled letters in the word

	//getting the number of lives
	var getLives = document.getElementbyId("mylives");

	//getting the form
	var form = document.getElementById("hangman");
	var submit = form.elements[1].value;

	//creating the buttons for the alphabet
	var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  getLetter = function() {
	var letter = form.elements[0].value;


  }

	//working with the results
	result = function () {
		wordHolder = document.getElementbyId('hold');
		correct = document.getElementbyId('ul');

		for (var i = 0; i < word.length; i++) {
			correct.setAttribute('id', 'my-word');
			guess = document.createElement('li');
			guess.setAttribute('class', 'guess');
			if (word[i] == "-") {
				guess.innerHTML = "-";
				spaces = 1;
			} else {
				guess.innerHTML = "_";
			}

			guesses.push(guess);
			wordHolder.appendChild(correct);
			correct.appendChild(guess);
		}
	}

	//displaying how many lives we got left
	displayLives = function () {
		getLives.innerHTML = "You have " + lives + " guesses left."
		if (lives == 1) {
			getLives.innerHTML = "You only have one guess left."
		} else if (lives < 1) {
			getLives.innerHTML = "You are completely hung.  You lose."
		}

		for (var i = 0; i < word.length; i++) {
			if (count + spaces == guesses.length) {
				showLives.innerHTML = "You win!  Congratulations."
			}
		}
	}

	//animating the hangman
	var animate = function () {
		drawArray[lives]();
	}

	//doing the canvas
	canvas = function () {
		manFigure = document.getElementbyId("stickman");
		context = manFigure.getContext('2d');
		context.beginPath();
		context.strokeStyle = "#000000";
		context.lineWidth = 2;
	};

	head = function () {
		manFigure = document.getElementbyId("stickman");
		context = manFigure.getContext('2d');
		context.beginPath();
		context.arc(60,25,10,0,Math.PI*2,true);
		context.stroke();
	}

	draw = function (x1, y1, x0, y0) {
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
		draw(0, 5, 50, 5);
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

	//checking on clicks

	check() {
    // list.onclick = function () {
    //   var geuss = (this.innerHTML);
    //   this.setAttribute("class", "active");
    //   this.onclick = null;
    //   for (var i = 0; i < word.length; i++) {
    //     if (word[i] === geuss) {
    //       geusses[i].innerHTML = geuss;
    //       counter += 1;
    //     } 
    //   }
    //   var j = (word.indexOf(geuss));
    //   if (j === -1) {
    //     lives -= 1;
    //     result();
    //     animate();
    //   } else {
    //     result();
    //   }
    // }
    
      var geuss = (form.elements[0].value);
      //this.setAttribute("class", "active");
      //this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        result();
        animate();
      } else {
        result();
      }
    

  }

	play = function () {
		word = "cat";
		word = word.replace(/\s/g, "-");
		console.log(word);
		buttons();

		guesses = [ ];
		lives = 10;
		count = 0;
		result();
		displayLives();
		canvas();



	}
	play();

	document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }












}