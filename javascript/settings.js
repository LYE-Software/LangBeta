var elem = document.getElementById("contentdiv")
function clearAll(){
    var arr = document.getElementsByClassName("option");
    for (var i = 0; i<arr.length; i++){
        arr[i].style.backgroundColor = "white";
    }
}

function stats(){
    user = window.localStorage.getItem("customusername")
    var data = `
    <h1>${user}</h1>
    <p>You have been a Lang Study user for <strong>${date}.</strong></p>
    <p>You have <strong>${amt} Studysheets.</strong></p>
    <p>You last studied <strong>${last}</strong>.</p>
    `
}

function manage(){

}

function switchAcc(){

}

function display(){

}

function connect(){

}

function adv(){

}