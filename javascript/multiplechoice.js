var sheet;
function starter(){
    
    let randomthing = window.localStorage.getItem("random");
    if (randomthing == "true"){
        doRandom = true;
    }
    
    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"

    sheet = parseFromJSON(rawJson)
    runMultipleChoice()
}

var num = 0;
var mnum = 0;
var checkAsMulti = false;
function runMultipleChoice(){
    document.getElementById("term_image").style.display = "none";
    var theTerm = sheet.getNthTerm(num);
    if (theTerm.hasImage){
        document.getElementById("term_image").children[0].src = theTerm.imageSrc;
        document.getElementById("term_image").style.display = "";
    }

    if (num >= sheet.length){
        showElement(document.getElementById("completedMode"))
        num = 0;
        if (window.localStorage.getItem("random")=="true"){
            sheet.randomize();
        }
    } else {
        if (theTerm.isMulti){
            document.getElementById("multiheader").innerHTML = theTerm.question;
            document.getElementById("multiheader").style.display = "";
            document.getElementById("singleheader").innerHTML = theTerm.terms[mnum];
        } else {
            document.getElementById("singleheader").innerHTML = theTerm.term;
            document.getElementById("multiheader").style.display = "none";
        }
    }

}

function checkMulti(){

}


function getFake(n){
    var tempSheet = sheet.remove(n)
    if (sheet.getNthTerm(n).isMulti){
        
    }
}