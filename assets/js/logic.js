let start = document.querySelector("#start");
let panel = document.querySelector("#questions");
let question = document.querySelector("#question-title");
let choiceBox = document.querySelector("#choices");
let currentQuest = 0;
let answerIndex = quizData[currentQuest].correctChoice;

function quiz(){
    panel.classList.remove("hide")
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
                console.log('True')
                choiceBox.removeChild(list)
                currentQuest++
                quiz();
            } else {
                console.log('False')
            }
        })
    }
    choiceBox.appendChild(list)
    
    console.log(choiceBox)
    
}




start.addEventListener("click", quiz)


