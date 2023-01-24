//-------------------------------------------- retrieving localstorage data----------------------------------------------------------------//

// variable which retrieve data from the localstorage
let hs = JSON.parse(localStorage.getItem("high-scores"))||[];
// sorts array so that the highest score has the lowest index
hs.sort(function(a, b){return b.storedScore - a.storedScore});
// links ol from highscore.html
let ol = document.getElementById("highscores");
// appends data from local storage to hitml page
for(let i = 0; i < hs.length; i++){
    let li = document.createElement("li");
    // adds the initals and score to li 
    li.textContent = hs[i].initials + " - " + hs[i].storedScore;
    //appends data to display in ol
    ol.appendChild(li);
}

//links clear highscores button to variable clearScores.
let clearScores = document.getElementById("clear");

// functionality for clear highscores button
clearScores.addEventListener("click", function(){
    // removes localStorage data
    localStorage.removeItem("high-scores");
    // refreshes the page so that ol does not display anything anymore. 
    location.reload();
})
