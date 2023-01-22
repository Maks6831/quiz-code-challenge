let start = document.querySelector("#start");
let panel = document.querySelector("#questions");
let question = document.querySelector("#question-title");
let choiceBox = document.querySelector("#choices");
let endScreen = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");


let currentQuest = 0;
let answerIndex = quizData[currentQuest].correctChoice;
let score = 0; 


function finale() {
    endScreen.classList.remove("hide");
    finalScore.innerHTML = score;
}






function quiz(){
    if (currentQuest === 5) {
        panel.classList.add("hide");
        start.classList.remove("hide");
        endScreen.classList.remove("hide");
        start.textContent = "Retake Quiz";
        currentQuest = 0;
        finale();
    } else {
        start.classList.add("hide");
        panel.classList.remove("hide");
    question.textContent = quizData[currentQuest].question;
    console.log(currentQuest);
    const list = document.createElement("ul");
    for (let i = 0; i < 4; i++){
        const li = document.createElement("li");
        li.className = "li" + [i]
        li.textContent = quizData[currentQuest].choices[i];
        list.appendChild(li);
        li.addEventListener("click", function(){
            if(li.textContent == quizData[currentQuest].choices[quizData[currentQuest].correctChoice]) {
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
                }, 1000)
             } else {
                console.log('False')
                currentQuest++;
                choiceBox.removeChild(list)
                quiz();
                const wrong = document.createElement("h4");
                wrong.textContent = "Wrong!!"
                choiceBox.appendChild(wrong);
                wrong.classList.add("appear");
                setTimeout(function() {
                    wrong.classList.add("hide");
                }, 1000)
            
         }}) 
    }
    choiceBox.appendChild(list);
    console.log(choiceBox)    
}       
} 
start.addEventListener("click", quiz)


