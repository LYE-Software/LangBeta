
async function doPreviewAndLocal(){

    

    console.log("in dopreview")
    document.getElementById("homeusername").innerHTML = localStorage.getItem("customusername");

    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    if(url.searchParams.get("userid")!= null){
        if (window.localStorage.getItem("savedShare")){
            document.getElementById("saveBtn").innerHTML = "Saved!";
            document.getElementById("saveBtn").onclick = function(){
                showPopup("You already saved this Studysheet!")
            };
        }
        document.getElementById("saveBtnHolder").style.display = "";
        console.log("inside shareEvent")
        sessionid = url.searchParams.get("userid")
        chosensheet = url.searchParams.get("sheetName")
        window.localStorage.setItem("sharedID", sessionid);
        window.localStorage.setItem("sharedSheet", chosensheet);
        console.log(chosensheet)
        sheet = await httpGet("https://backend.langstudy.tech:444/id/"+sessionid+"/Studysheets/"+chosensheet)
        document.getElementById("studysheetname").innerHTML = chosensheet
        document.getElementById("editbutton").style.borderColor = "#a0a0a0"
        document.getElementById("editbutton").style.backgroundColor = "#a0a0a0"

        document.getElementById("editbutton").onclick = function(){
            document.getElementById('notOwned').style.pointerEvents = "all";
            document.getElementById('notOwned').style.opacity = 1;
        }
    
    } 
    else if(window.localStorage.getItem("sharedID") != "" &&  window.localStorage.getItem("sharedID") != null){
        if (window.localStorage.getItem("savedShare")){
            document.getElementById("saveBtn").innerHTML = "Saved!";
            document.getElementById("saveBtn").onclick = function(){
                showPopup("You already saved this Studysheet!")
            };
        }
        console.log("Shared back")
        document.getElementById("saveBtnHolder").style.display = "";
        console.log("inside localstorage")
        chosensheet = window.localStorage.getItem("sharedSheet").replaceAll(" ", "%20");
        chosensheet = chosensheet.replaceAll("&", "%26")
        sheet = await httpGet("https://backend.langstudy.tech:444/id/"+window.localStorage.getItem("sharedID")+"/Studysheets/"+chosensheet)
        chosensheet = chosensheet.replaceAll("%26", "&")
        chosensheet = chosensheet.replaceAll("%20", " ");

        document.getElementById("studysheetname").innerHTML = chosensheet
        document.getElementById("editbutton").style.borderColor = "#a0a0a0"
        document.getElementById("editbutton").style.backgroundColor = "#a0a0a0"

        document.getElementById("editbutton").onclick = function(){
            document.getElementById('notOwned').style.pointerEvents = "all";
            document.getElementById('notOwned').style.opacity = 1;
        }
    }
    else{
        chosensheet = window.localStorage.getItem("chosenSheet")

        if(chosensheet == null || chosensheet == ""){
            document.getElementById("unableToFind").style.opacity = "1";
            document.getElementById("unableToFind").style.pointerEvents = "all"; 
        }

        toek = window.localStorage.getItem("usertoken")
        document.getElementById("studysheetname").innerHTML = chosensheet
        sheet = await httpGet("https://backend.langstudy.tech:444/"+toek+"/Studysheets/"+chosensheet+"/RequestPreview")
        // console.warn("inside the second go")
    }

    if (sheet == "" || sheet == null || sheet == "invalidsession"){
        document.getElementById("unableToFind").style.opacity = "1";
        document.getElementById("unableToFind").style.pointerEvents = "all"; 
    }

    // document.getElementById("noclickdiv").style.display = "none";
    // console.warn("testing bruh why is it doing this")
    
    console.log("og sheet: "+sheet)
    
    window.localStorage.setItem("fullstudysheet", sheet)
    displaySheet(sheet)
    document.getElementById("noclickdiv").style.opacity = "0";
    document.getElementById("noclickdiv").style.pointerEvents = "none";

}



function displaySheet(sheet){
    var newSheet = parseFromJSON(sheet);
    for (var i = 0; i<newSheet.length; i++){
        if (newSheet.getNthTerm(i).isMulti){
            makeMulti(newSheet.getNthTerm(i), i);
        } else{
            makeSingle(newSheet.getNthTerm(i).term, newSheet.getNthTerm(i).answer);
        }
    }
}


function makeSingle(term, def){
    var single = `
    <div class="termdef">
        <div>
            <div>${term}</div>
            <div>${def}</div>
        </div>
    </div>
    `
    document.getElementById("termsContainer").innerHTML+=single;
}

function makeMulti(multi, i){
    var multiTemplate = `
    <div class="multiTermDef" id="${"multi"+i}">
        <div>${multi.question}</div>
        
    </div>`
    document.getElementById("termsContainer").innerHTML+=multiTemplate;
    for (var j = 0; j<multi.length; j++){
        var altTemplate = `
        <div class="multiEntry">
            <img src="assets/icons/Arrow 2.svg">
            <div>${multi.terms[j]}</div>
            <div>${multi.answers[j]}</div>
        </div>`
        document.getElementById("multi"+i).innerHTML+=altTemplate;
    }
}
    