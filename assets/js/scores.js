let hs = JSON.parse(localStorage.getItem("high-scores"))||[];
hs.sort(function(a, b){return b.storedScore - a.storedScore});
let ol = document.getElementById("highscores");

for(let i = 0; i < hs.length; i++){
    let li = document.createElement("li");
    li.textContent = hs[i].initials + " - " + hs[i].storedScore;

    ol.appendChild(li);
}
