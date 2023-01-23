let start = document.querySelector("#start");
let panel = document.querySelector("#questions");
let question = document.querySelector("#question-title");
let choiceBox = document.querySelector("#choices");
let endScreen = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");
const timer = document.querySelector("#time");
let initInput = document.querySelector("#initials");
let submit = document.querySelector("#submit");
const startMinutes = 2;
let time = startMinutes * 60; 
let currentQuest = 0;
let answerIndex = quizData[currentQuest].correctChoice;
let score = 0; 
let clock = null;
timer.innerHTML = "2: 00"

submit.addEventListener("click", function(event){
    event.preventDefault();
    let user = {
        initials: initInput.value.trim(),
        storedScore: finalScore.textContent,
    }
    

    if(initials === ""){
        alert("Error!");
        alert("Initials cannot be blank");
    } else {
        localStorage.setItem("user", JSON.stringify(user))
    }

})




function finale() {
    endScreen.classList.remove("hide");
    finalScore.innerHTML = score;
}


function endgame(){
    panel.classList.add("hide");
    endScreen.classList.remove("hide");
    currentQuest = 0;
    finale();
}

function clear() {
    clearInterval(clock);
    endgame();
    timer.innerHTML = "Finished!"
}

function countDown () {
    console.log(time);
    clock = setInterval(function(){
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (time > 0){
            seconds = seconds < 10 ? "0" + seconds: seconds;
            timer.innerHTML = `${minutes}: ${seconds}`;
            time--;
        } else {
            clear();    
    } 
    }, 1000)
    }


function playCorrect() {
    let audio = new Audio("./assets/sfx/correct.wav");
    audio.play();
}

function playIncorrect() {
    let audio = new Audio("./assets/sfx/incorrect.wav");
    audio.play();
    audio.volume = 0.5;
}





function quiz(){
    if (currentQuest === 5) {
        clear();
    } else {
        start.classList.add("hide");
        panel.classList.remove("hide");
    question.textContent = quizData[currentQuest].question;
    console.log(currentQuest);
    const buttonDiv = document.createElement("div");
    for (let i = 0; i < 4; i++){
        
        const button = document.createElement("button");
        button.className = "button" + [i]
        button.innerHTML = quizData[currentQuest].choices[i];
        console.log(button)
        buttonDiv.appendChild(button);
        button.addEventListener("click", function(){
            if(button.textContent == quizData[currentQuest].choices[quizData[currentQuest].correctChoice]) {
                playCorrect();
                console.log('True');
                choiceBox.removeChild(buttonDiv);
                currentQuest++
                score++;
                quiz();
                const right = document.createElement("h4");
                right.textContent = "Correct!";
                choiceBox.appendChild(right);
                right.classList.add("appear");
                setTimeout(function() {
                    right.classList.add("hide");
                }, 600);
             } else {
                playIncorrect();
                console.log('False')
                time = time - 40;
                currentQuest++;
                choiceBox.removeChild(buttonDiv);
                quiz();
                const wrong = document.createElement("h4"); 
                wrong.textContent = "Wrong!! 30 seconds deducted..."
                choiceBox.appendChild(wrong);
                wrong.classList.add("appear");
                setTimeout(function() {
                    wrong.classList.add("hide");
                }, 600);
            
         }}) 
    }
    choiceBox.appendChild(buttonDiv);
    console.log(choiceBox)    
}       
} 
start.addEventListener("click", function(){
    countDown();
    quiz();
    
})