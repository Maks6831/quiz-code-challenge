let start = document.querySelector("#start");
let panel = document.querySelector("#questions");
let question = document.querySelector("#question-title");
let choiceBox = document.querySelector("#choices");

start.addEventListener("click", function(){
    panel.classList.remove("hide")
    question.textContent = quizData[0].question
    const list = document.createElement("ul");
    for (let i = 0; i < quizData[0].choices.length; i++){
        const li = document.createElement("li");
        li.textContent = quizData[0].choices[i];
        list.appendChild(li);

    }
    choiceBox.appendChild(list);
})