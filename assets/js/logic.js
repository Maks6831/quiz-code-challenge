let start = document.querySelector("#start");
let panel = document.querySelector("#questions");
let question = document.querySelector("#question-title");
let choiceBox = document.querySelector("#choices");
let endScreen = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");
const timer = document.querySelector("#time");
const startMinutes = 2;
let time = startMinutes * 60; 
let currentQuest = 0;
let answerIndex = quizData[currentQuest].correctChoice;
let score = 0; 



function finale() {
    endScreen.classList.remove("hide");
    finalScore.innerHTML = score;
}


function endgame(){
    panel.classList.add("hide");
    start.classList.remove("hide");
    endScreen.classList.remove("hide");
    start.textContent = "Retake Quiz";
    currentQuest = 0;
    finale();
}

function countDown () {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds: seconds;
    timer.innerHTML = `${minutes}: ${seconds}`;
    time--;
    if(time < 1){
        endgame()
        return clearInterval(countDown);
    }
}


function quiz(){
    if (currentQuest === 5) {
        endgame();
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
                console.log('True');
                choiceBox.removeChild(list)
                currentQuest++
                score += 1;
                quiz();
                const right = document.createElement("h4");
                right.textContent = "Correct!";
                choiceBox.appendChild(right);
                right.classList.add("appear");
                setTimeout(function() {
                    right.classList.add("hide");
                }, 600);
             } else {
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
    quiz();
    setInterval(countDown, 1000);
})


