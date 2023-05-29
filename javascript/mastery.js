function checkSettings(){

    let randomthing = window.localStorage.getItem("random");
    if (randomthing == "true"){
        doRandom = true;
    }
}

var rawJson;
var qNum = 0;
var multiNum = 0;
var correctCounter = 0
var incorrectCounter = 0
var checkAsMulti;
var term;
var sheet;
function startMastery(){

    if (qNum == 0){
        rawJson = window.localStorage.getItem("fullstudysheet")
        document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    
        sheet = parseFromJSON(rawJson)
    }
    
    if (window.localStorage.getItem("random")=="true"){
        sheet.randomize()
    }

    document.getElementById("term_image").style.display = "none";
    document.getElementById("crctst").innerHTML = "Correct: " + correctCounter
    document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter
    document.getElementById("hint").classList.remove("showHint");

    input = document.getElementById("input")
    input.setAttribute("autocorrect", "off")
    input.setAttribute("autocomplete", "off")
    input.setAttribute("spellcheck", "off")
    input.style.display = "flex";

    runSheet()
}


function runSheet(){
    document.getElementById("term_image").style.display = "none";
    if (qNum >= sheet.length){
        showElement(document.getElementById("completedMode"))
        qNum = 0;
        if (window.localStorage.getItem("random")=="true"){
            sheet.randomize();
        }
    } else {
        term = sheet.getNthTerm(qNum);
        if (!term.isMulti){
            document.getElementById("displayWord").style.display = "flex";
            document.getElementById("displayWord").innerHTML = term.term;
            checkAsMulti = false;
            document.getElementById("multiQ").style.display = "none";
            document.getElementById("multiAlt").style.display = "none";

        } else {
            document.getElementById("multiQ").style.display = "flex";
            document.getElementById("multiAlt").style.display = "flex";
            document.getElementById("displayWord").style.display = "none";
            document.getElementById("multiAlt").innerHTML = term.terms[multiNum];
            document.getElementById("multiQ").innerHTML = term.question;
            checkAsMulti = true;
        }

        if (term.hasImage){
            document.getElementById("term_image").children[0].src = term.imageSrc;
            document.getElementById("term_image").style.display = "";
        }
    }
    
}


function checkSheet(){
    buttonStyling = document.getElementById("goButton")
    document.getElementById("hintText").innerHTML = "";
    document.getElementById("hint").classList.remove("showHint");
    usrInput = document.getElementById("input").value.toLowerCase().trim();
    var result;
    if (usrInput == ""){

    } else{
        if(checkAsMulti){
            result = term.multiCheck(usrInput, multiNum);
        } else {
            result = term.check(usrInput);
        }
    }

    if (result){
        correctCounter += 1
        document.getElementById("crctst").innerHTML = "Correct: " + correctCounter;
        buttonStyling.style.backgroundColor = "#3e8e41";
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000);
        input.value = "";

        if (term.isMulti){
            multiNum++
            if (multiNum >= term.length){
                multiNum = 0;
                qNum++;
            }
        } else {
            qNum++;
        }

        runSheet()

    } else {
        buttonStyling.style.backgroundColor = "#ce1483"
        setTimeout(function () { buttonStyling.style.backgroundColor = "wheat" }, 1000)
        input.value = "";
        incorrectCounter += 1;
        document.getElementById("incorrect").innerHTML = "Incorrect: " + incorrectCounter;
    }
    
}


function helpMastery(){
    
    document.getElementById("hint").classList.add("showHint");
    if (term.isMulti){
        document.getElementById("hintText").innerHTML = term.answers[multiNum];
    } else {
        document.getElementById("hintText").innerHTML = term.answer;
    }
    
    
}












