// variable with an array of questions
var questions = [
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What tag defines a division or the beginning/end of an individual section in an HTML document?",
        choices: ["<table>", "<meta>", "<img>", "<div>"],
        answer: "<div>"
    },
    
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",
        choices: ["RegExp", "Events", "boolean", "Condition"],
        answer: "Events"
    },
    {
        title: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
        choices: ["Conditional Loop", "Else Loop", "While Loop", "For Loop"],
        answer: "While Loop"
    },

];
// declared variables to count the score

// begin my variables to strt working code
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");


// seconds lrft of 15 seconds
var secondsLeft = 76;
// holds interval time
var holdInterval = 0;
// holds penalty time
var penalty = 10;
// new list element
var listCreate = document.createElement("ul");

// timer function that shows the timer going down. 
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textcontent = "Time: " + secondsLeft;

            if(secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textcontent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});


// rendering questions and choices to the page
function render(questionIndex) {
// clear existing data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
// for loop to go through the array of questions
for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
}
// new for each for question choices
userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (compare));
})
}


// event to compare choices with the correct answer

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {

    // need to deduct time if wrong answer
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

// question index to determine which question user is on

questionIndex++;

if (questionIndex >= questions.length) {
// all doen question to append wth the user stats
allDone();
createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
} else {
render(questionIndex);
}
questionsDiv.appendChild(createDiv);
}

// all done appends last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);
    // paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // calc timer remaining and replace with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // label

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit question
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);
    
// event listener to capture initials and local storage for initials and score
createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

        console.log("No value entered!");

    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        // Travels to final page
        window.location.replace("./HighScores.html");
    }
});
}
