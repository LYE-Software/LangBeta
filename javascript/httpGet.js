
async function httpGet(theUrl, lye){
    
    //this needs to be async as we cannot set timeout for sync request and sync reqs halt all js for browser
    var xmlHttp = new XMLHttpRequest();
    console.log("Opening Connection to "+theUrl)
    // xmlHttp.timeout = 5000;
    
    // xmlHttp.ontimeout = () => {
    //     console.error(`The request for ${url} timed out.`);
    //     alert('The request for '+theUrl+' timed out. We will be reloading this page after the dialogue box is removed.')
    //     window.location.reload();
    //     changeToOffline();
    // };
    xmlHttp.onload = () => {
        if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            console.log("status200")
            console.log( xmlHttp.responseText);
        } else {
            console.error(xmlHttp.statusText);
        }
        }
    };
    await xmlHttp.open( "GET", theUrl, true ); // false for synchronous request

    if (lye == true){
        console.log("setting headers")
        xmlHttp.setRequestHeader("lye-origin", "langstudy.tech/homepage.html");
    }
    xmlHttp.setRequestHeader("Keep-Alive", "timeout=10, max=5");
    console.log(xmlHttp.status)
    try {
        xmlHttp.send( null );
    } catch (error) {
        console.log(error)
        alert("error line 205 alt ")
        failedServerConnectionOnStart();

        //put a splash screen error here
    }
    
    
    console.log(xmlHttp.status)
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("HTTPGET STATUS: "+xmlHttp.status)
            if(xmlHttp.status == 0){
                offline = true;
                console.error("GET Request status = 0.")
            }
            console.log("XMLHTTP RESPONSE BEGIN")
            console.log(xmlHttp.responseText)
            console.log("XMLHTTP RESPONSE END")
          resolve(xmlHttp.responseText);
        }, 2000);
      });
}
