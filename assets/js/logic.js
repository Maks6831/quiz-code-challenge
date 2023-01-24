
//----------------------------------------------------- global variables---------------------------------------------------------------//

let start = document.querySelector("#start"); // links start quiz button.
let panel = document.querySelector("#questions"); // links the div that should contain Qs and As.
let question = document.querySelector("#question-title"); // link where question will be inputted.
let choiceBox = document.querySelector("#choices"); // links where the answers buttons will be.
let endScreen = document.querySelector("#end-screen"); // links the submit section.
let finalScore = document.querySelector("#final-score"); // links score display in button section.
const timer = document.querySelector("#time"); //  links the time display.
let initInput = document.querySelector("#initials"); // links input for initials on endscreen.
let submit = document.querySelector("#submit"); // links submit button on endscreen.
const startMinutes = 2; // sets the amount of minutes for the countdown.
let time = startMinutes * 60; // converts amount of minutes to a time parameter.
let currentQuest = 0; // chooses the question from the array of objects in questions.js
let answerIndex = quizData[currentQuest].correctChoice; // stores the index of the correct answer in choises array.
let score = 0; // sets up score for player. 
let clock = null; // used to "setInterval" function inside countdown function.
timer.innerHTML = "2: 00" //displays initial time onto index.html.

//------------------------------------------------------- submit button --------------------------------------------------------------//

/* event listener for submit button on endscreen, clicking the button leads to the initials and score being stored into local storage */
submit.addEventListener("click", function(event){
    event.preventDefault();
    // initials variable stores the initials from the input
    let initials = initInput.value.trim();
    // if statement to display error message if input is left blank.
    if(initials === ""){
        alert("Error!");
        alert("Initials cannot be blank");
    } else {
        // user object created to store initials and final score. 
        let user = {
            initials: initials,
            storedScore: finalScore.textContent,
        }
        // highScores variable retrieves the high-scores key from localstorage or creates an empty array. 
        let highScores = JSON.parse(localStorage.getItem("high-scores"))||[];
        // adds user information to highScores
        highScores.push(user);
        // sends the new highscores list to the localstorage.
        localStorage.setItem("high-scores", JSON.stringify(highScores));
        // changes to highscores page.
        window.location.href = "highscores.html";
    }

})

//------------------------------------------------------------- quiz end ----------------------------------------------------------------//

// end game hides the question div sand 
function endgame(){
    // hide class has a display: none style. this adds that class and so removes the questions div.
    panel.classList.add("hide");
    // this displays the endscreen (score display and submit) div.
    endScreen.classList.remove("hide");
    //displays score.
    finalScore.innerHTML = score;
    // resets the current question to 0 
    currentQuest = 0;
}

// this function to begins the end of the game is done if time has ran out or the questions have finished. 
function clear() {
    //stops clock
    clearInterval(clock);
    endgame();
    // changes timer display to finished!
    timer.innerHTML = "Finished!"
}

//------------------------------------------------------------- timer ----------------------------------------------------------------//

//function for timer executed when start quiz is pressed.
function countDown () {
    clock = setInterval(function(){
        // to create the X:XX style ...
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (time > 0){
            // so that clock displays 1:09 instead of 1:9
            seconds = seconds < 10 ? "0" + seconds: seconds;
            // displays minutes and seconds 
            timer.innerHTML = `${minutes}: ${seconds}`;
            time--;
        } else {
            // if time = 0 the games is ended.
            clear();    
    } 
    }, 1000)
    }

//----------------------------------------------------------- sounds ----------------------------------------------------------------//

// function for sound execution when player is correct!
function playCorrect() {
    let audio = new Audio("./assets/sfx/correct.wav");
    //plays audio file
    audio.play();
    // so that volume is not too loud..
    audio.volume = 0.5
}

// function for sound execution when player is incorrect 
function playIncorrect() {
    let audio = new Audio("./assets/sfx/incorrect.wav");
    //plays audio file 
    audio.play();
    // so that volume is not too loud..
    audio.volume = 0.5;
}

//-----------------------------------------------------------quiz main ------------------------------------------------------//

// function for handling the choice enduser makes.
function handleChoice(event) {
    let button = event.target;
    // if statement for determining whether end user chooses correct button or not.
    if(button.textContent == quizData[currentQuest].choices[quizData[currentQuest].correctChoice]) {
        //plays the correct sound
        playCorrect();
       //moves on to next question
        currentQuest++;
        // adds 1 to score
        score++;
        //executes quiz function but with the next question(line 120)
        quiz();
        //the following creates a temporary header below the quiz div displaying correct.
        const right = document.createElement("h4");
        right.textContent = "Correct!";
        choiceBox.appendChild(right);
        //provides opacity:0.6
        right.classList.add("appear");
        //function to stop header from displaying after 0.6 seconds.
        setTimeout(function() {
            right.classList.add("hide");
        }, 600);
     } else { // this is for when the user gets it wrong. 
        // plays the incorrect sound 
        playIncorrect();
        //deducts 40 seconds from timer
        time = time - 40;
        // increases index so that the next question will display
        currentQuest++;
        // next question is displayed. 
        quiz();
        //the following creates a temporary header below the quiz div displaying Wrong.
        const wrong = document.createElement("h4"); 
        wrong.textContent = "Wrong!! 40 seconds deducted..."
        choiceBox.appendChild(wrong);
        //opacity to 0.6
        wrong.classList.add("appear");
        // to remove function aft 0.6 seconds.
        setTimeout(function() {
            wrong.classList.add("hide");
        }, 600);
    
 }

}

function quiz(){
    // if all of the questions are asked begin endgame process
    if (currentQuest === 5) {
        clear();
    } else {
        //removes start quiz button
        start.classList.add("hide");
        // displays questions div
        panel.classList.remove("hide");
        // displays the current question.
    question.textContent = quizData[currentQuest].question;
    //creates div to store all of the button.
    const buttonDiv = document.createElement("div");
    // empties the choices section (for the next question choices)
    choiceBox.innerHTML = "";
    //create buttons
    for (let i = 0; i < 4; i++){
        const button = document.createElement("button");
        // gives each button a distinct class name
        button.className = "button" + [i];
        // populates buttos with the potential answers array from question.js
        button.innerHTML = quizData[currentQuest].choices[i];
        // appends buttons to the buttonDiv
        buttonDiv.appendChild(button);
        // adds functionality to buttons
        button.addEventListener("click", handleChoice); 
    }
    // appends buttonDiv to display in choices section
    choiceBox.appendChild(buttonDiv);
}       
} 

//---------------------------------------------------------- quiz start!!-----------------------------------------------------------//



start.addEventListener("click", function(){
    // commences countdown.
    countDown();
    // starts quiz!!!!
    quiz();
    
})