
let gameBar = document.querySelector(".gameBar")
console.dir(gameBar)
let documentHeight = gameBar.scrollHeight-40;
let documentWidth = gameBar.scrollWidth-40;
let liveTime = 900;
let generationOfNewTargetTime = 1000;
let score = 0;

let recordList = []
document.addEventListener("DOMContentLoaded", ()=>{ 
    try{
        recordList = JSON.parse(localStorage.getItem("recordList"))
    }
    finally{
        if(!recordList)
        {
            recordList = []
        }
    }
    updateTable();

});

function resultChecker(score){
    n=recordList.length-1;
    if(n<9)
    {
        n++;
    }
    lastrecord = (recordList[n]) ? recordList[n].score : 0;
    if(lastrecord<score)
    {
        nickname = window.prompt("Введите nickname:","Player")
        recordList[n] = {"nickname":nickname,"score":score};
    }
}
// function setNickname(e)
// {
//     nickname = e.target.value;
// }

function setDifficulty(e){
    switch(e.target.value){
        case 'Easy':
            counter=5;
            break;
        case 'Normal':
            counter = 10;
            liveTime = 800;
            generationOfNewTargetTime = 500; 
            break;
        case 'Hard':
            liveTime = 700;
            generationOfNewTargetTime = 250;
            break;
    }
}
function updateTable()
{
    rows = document.querySelector("#recordTable").querySelectorAll("tr");

    recordList.sort((a,b)=>{return b.score - a.score})
    k = 1;
    for (val of recordList) {
        let tds = rows[k].querySelectorAll("td");
        tds[0].innerHTML = recordList[k-1].nickname
        tds[1].innerHTML = recordList[k-1].score
        k++;
    }
    localStorage.setItem("recordList", JSON.stringify(recordList));
}
function hit(e)
{
    score++;
    e.target.remove();
    document.querySelector("#score").innerHTML=`Попаданий ${score}`
}

let counter = 5;
function startGame()
{
    document.querySelector("#score").innerHTML=`Попаданий ${score}`
    document.querySelector("#counter").innerHTML=`Жизней ${counter}`
    document.querySelector("#startbutton").setAttribute("disabled", true)
    let index = 0;
    console.log("s")
    const intervalID = setInterval((()=>{
    if(counter>0)
    {
        
        let newDiv = document.createElement("div");
        index++;
        newDiv.setAttribute("id",`target${index}`)
        newDiv.classList.add("target")
        newDiv.addEventListener("click",hit)
        currentTop = Math.floor(Math.random() * documentHeight);
        currentLeft = Math.floor(Math.random() * documentWidth);
        newDiv.style.top = currentTop + "px";
        newDiv.style.left = currentLeft + "px";
        
        tmp = document.querySelector(".gameBar")
        console.log(counter);
        tmp.appendChild(newDiv)
        setTimeout((()=>{
            console.log(newDiv);
           
            if(tmp.querySelector(`#${newDiv.id}`))
            {
                --counter;
                document.querySelector("#counter").innerHTML=`Жизней ${counter}`
                newDiv.remove();
            }
        }),liveTime)
    }
    else
    {
        targets = document.querySelector(".gameBar").querySelectorAll("div");
        for(val of targets){
            val.remove();
        }
        clearInterval(intervalID);
        console.log("f")
        document.querySelector("#startbutton").removeAttribute("disabled")
        counter = 30;
        resultChecker(score)
        document.querySelector("#counter").innerHTML=`Жизней xxx`
        updateTable();
        score = 0;
    } 
    }),generationOfNewTargetTime)
   
}

document.querySelector("#startbutton").addEventListener("click", startGame);
document.querySelector("#difficulty").addEventListener("change",setDifficulty)
// document.querySelector("#nickname").addEventListener("change",setNickname)


