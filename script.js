let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let mainContainer = document.querySelector(".container");
let chatContainer = document.querySelector(".chat-container");
let userMsg = null;
let api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDES6U8ZQ0lJPZarUI5lXvl_EvdrjZTDIw`;


btn.addEventListener('click',()=>{
    userMsg = prompt.value;
    if(userMsg == ""){
        mainContainer.style.display = "flex";
    }{
        mainContainer.style.display = "none";
    }
    if(!userMsg){
        return;
    }
    let html = ` <div class="img">
                <img src="./assets/profile.png" alt="user" width="50px">
            </div>
            <p class="text"></p>`;
    let userBox = createChatbox(html,"user-chatbox");
    userBox.querySelector(".text").innerText = userMsg;
    chatContainer.append(userBox);
    
    prompt.value ="";
    
    setTimeout(showloading,500);
    
})


function createChatbox(html,className){
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

function showloading(){
    let html = `  <div class="img">
                <img src="./assets/artificial-intelligence.png" alt="user" width="50px">
            </div>
            <p class="text"></p>
            <img class="loading" src="./assets/load.gif" alt="loading" height="50">`;
    let aiBox = createChatbox(html,"ai-chatbox");
    chatContainer.append(aiBox);
    

    btn.removeChild(btn.childNodes[0]);
    let loading = document.createElement("img");
    loading.src = "./assets/uploading.gif";
    btn.appendChild(loading);
    getResponse(aiBox)
}

async function getResponse(aiBox){
    let txtEle = aiBox.querySelector(".text");
    try {
        let response = await fetch(api_url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents:[
                    {   "role": "user",
                        "parts":[{"text":userMsg}]
                    }
                ]
            })

        })
        let data = await response.json();
        // console.log(data);
        const converter = new showdown.Converter();
        let result = data.candidates[0].content.parts[0].text;
        let htmlText = converter.makeHtml(result);
        
        console.log(htmlText);
        txtEle.innerHTML = htmlText;
        

    } catch (error) {
        console.log(error);
        
    }

    finally{
        aiBox.querySelector(".loading").style.display = "none";
        btn.removeChild(btn.childNodes[0]);
        let loading = document.createElement("img");
        loading.src = "./assets/send.svg";
        btn.appendChild(loading);
    }

}



