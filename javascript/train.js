var subLocation; // location within set of groups (ie loc=3 of 7 groups)
var t; // location within each group ((grouplength*5)+grouplength)
var sheet;
var groupLength;
var reviewIDX;
function doTrain(){
    document.getElementById("informationAbt").style.display = "none";
    document.getElementById("myBtnBegin").style.display = "none";
    try {
        document.getElementById("file").style.display = "none";

    } catch (error) {
        
    }
    rawJson = window.localStorage.getItem("fullstudysheet")
    document.title = window.localStorage.getItem("chosenSheet") + " | Lang"
    sheet = parseFromJSON(rawJson)
    loc = 0;
    if (document.getElementById("termsperround").value == null || document.getElementById("termsperround").value <=3){
        groupLength = 5;
    } else if (document.getElementById("termsperround").value>=sheet.length) {
        groupLength = sheet.length-1;
    }
    
    reviewIDX = calculateReview(groupLength);

    //dividing questions into groups
    
    for (var i = 0; i < sheet.length; i++){

    }

}



var wage = document.getElementById("input");
wage.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        console.log("ENTER PRESS: t = "+t+" customAnswer = "+customAnswer+"")
        if (isTrainWrite == true){
            checkTrain()
        }
    }
});
doTrain();




function calculateReview(groupLength){
    t = (groupLength*5)+groupLength;
    var rotations;
    var extra;
    var leftover = groupLength - 5;
    if (leftover <= 0){
        console.log("we need up to group "+(5-Math.abs(leftover)));
        rotations = 0;
        extra = 5-Math.abs(leftover);
    } else if (leftover >0){
        var count = 1;
        while(leftover>=5){
            leftover-=5;
            count++;
        }
        console.log(count+" full rotations plus "+leftover+" extra");
        rotations = count;
        extra = leftover;
    }
    
    var time = [];
    for (var i = 1; i<=t; i++){
        time.push(i);
    }
    console.log("time: "+time)
    var fifth = Math.round(t/5);
    console.log("fifth: "+fifth)
    var locations = [];
    if (rotations == 0){
        for (var i = 1; i<=extra; i++){
            var currentMin = fifth*(i-1);
            var currentMax = fifth*i;
            var tmpArr = [];
            for (var j = currentMin; j<currentMax; j++){
                tmpArr.push(time[j])
            }
            var loc = Math.round(tmpArr.length/2)
            console.log("currentmin: "+currentMin+" | currentmax: "+currentMax+" | tmpArr: "+tmpArr+" | loc: "+loc+" | extra: "+extra)
            locations.push(tmpArr[loc]);
            console.log("this SHOULD repeat")
        }
    } else {


        totalReview = groupLength;
        perMode = [0, 0, 0, 0, 0]

        for (var i = 0; i<groupLength; i++){
            var count = i;
            while (count>4){
                count-=5;
            }
            perMode[count]++;
        }
        console.log("reviews per mode: "+perMode)
        for (var i = 0; i<5; i++){
            var currentMin = fifth*(i);
            var currentMax = fifth*(i+1);
            console.log("current min: "+currentMin+" | currentmax: "+currentMax)
            var tmpArr = [];
            for (var j = currentMin; j<currentMax; j++){
                tmpArr.push(time[j])
            }
            console.log("must find "+perMode[i]+" spots for this t")
            console.log("tmparr: "+tmpArr)
            var fraction = Math.round(tmpArr.length/perMode[i]);
            console.log("fraction: "+fraction)
            for (var j = 0; j<perMode[i]; j++){
                var insideMin = fraction*j;
                var insideMax = fraction*(j+1);
                console.log("inside min: "+insideMin+" | insidemax: "+insideMax)
                var miniArr = [];
                for (var x = insideMin; x<insideMax; x++){
                    miniArr.push(tmpArr[x])
                }
                var loc = Math.round(miniArr.length/2);
                locations.push(miniArr[loc]);
            }

        }
        
        
    }
    console.log("locations: "+locations);
    return locations;
}