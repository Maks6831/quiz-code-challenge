let start = document.querySelector("#start");
let panel = document.querySelector("#questions");
let question = document.querySelector("#question-title");
let choiceBox = document.querySelector("#choices");
const list = document.createElement("ul");
for (let i = 0; i < quizData[0].choices.length; i++){
    const li = document.createElement("li")
    li.className = i;
    list.appendChild(li);
}

choiceBox.appendChild(list);

let currentQuest = 0;





start.addEventListener("click", function(){
    panel.classList.remove("hide")
    question.textContent = quizData[currentQuest].question;
    
})