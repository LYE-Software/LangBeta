var newSheet;
var idx = 0;
function doFlashcards(){
    console.log("Flashcarding")
    document.getElementById("listview").style.display = "none"
    showElement(document.getElementById("flashcardBox"))
    document.getElementById("flashcardBox").style.display = ""
    document.getElementById("outerFlashcards").style.display = "flex"
    showElement(document.getElementById("outerFlashcards"))
    document.getElementById("flashcard").src = "assets/icons/list.png"
    document.getElementById("flashcard").onclick=function(){
        document.getElementById("listview").style.display = "block"
        document.getElementById("flashcardBox").style.display = "none"
        document.getElementById("outerFlashcards").style.display = "none"
        this.onclick = doFlashcards;
        this.src = "assets/icons/flashcards.png"
    }
    makeCards()
}



function makeCards(){
    console.log("sheet: "+sheet)
    newSheet = parseFromJSON(sheet)
    newSheet = arrayToSheet(newSheet.convertToSingle(), "sheet")
    var appendTo = document.getElementById("flashcardBox")
    for (let i = 0; i<newSheet.length; i++){
        let basic = `
        <div class="flashcard">
            <div class="flashcardContents" data-term="${i}" data-state="front" onclick="nextCard(this)">
                ${newSheet.getNthTerm(i).term}
            </div>
        </div>
        `
        appendTo.innerHTML += basic
    }
    appendTo.children[0].children[0].onclick=function(){flipCard(this)}
}

function flipCard(card){
    console.log(card)
    if (card.getAttribute("data-state") == "front"){
        card.className = "flashcardContents cardFlip"
        setTimeout(function(){
            card.innerHTML = newSheet.getNthTerm(card.getAttribute("data-term")).answer
        }, 500)
        card.setAttribute("data-state", "back")
        setTimeout(function(){
            card.className = "flashcardContents"
        }, 1000)
    } else {
        card.className = "flashcardContents cardFlip"
        setTimeout(function(){
            card.innerHTML = newSheet.getNthTerm(card.getAttribute("data-term")).term
        }, 500)
        setTimeout(function(){
            card.className = "flashcardContents"
        }, 1000)
        card.setAttribute("data-state", "front")     
    }
}

function nextCard(card){
    currentNum = idx;
    document.getElementById("outerFlashcards").scrollTop =360*(idx+1);
    idx++;
    card.onclick = function(){flipCard(this)}
    document.getElementById("flashcardBox").children[idx-1].children[0].onclick = function(){previousCard(this)}
}

function previousCard(card){
    console.log("trying to go previous")
    document.getElementById("outerFlashcards").scrollTop = document.getElementById("outerFlashcards").scrollTop - 360;
    idx--;
    card.onclick = function(){flipCard(this)}
    if ((idx-1)>0){
        document.getElementById("flashcardBox").children[idx].children[0].onclick = function(){previousCard(this)}
    }
    document.getElementById("flashcardBox").children[idx+1].children[0].onclick = function(){nextCard(this)}
}