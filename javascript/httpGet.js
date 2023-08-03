
async function httpGet(theUrl, lye){
 
    return new Promise((resolve, reject) => {
        var xmlHttp = new XMLHttpRequest();
        console.log("Opening Connection to "+theUrl)
        
        xmlHttp.onload = () => {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    console.log("status200")
                    console.log( xmlHttp.responseText);
                    resolve(xmlHttp.responseText);
                } else {
                    console.error(xmlHttp.statusText);
                    failedServerConnectionOnStart()
                }
            }
        };
        xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    
        if (lye == true){
            console.log("setting headers")
            xmlHttp.setRequestHeader("lye-origin", "langstudy.tech/homepage.html");
        }
    
        xmlHttp.onerror = (e) => {
            console.error(xhr.statusText)
        }
    
        xmlHttp.send( null );

    })

}
