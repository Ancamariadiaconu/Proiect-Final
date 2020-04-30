let adminList={};
async function getAdmin(){
    let response = await fetch("https://final-project-corect.firebaseio.com/.json");
    adminList = await response.json();
    draw();
}
function draw(){
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector(".adminTable").classList.remove("hidden");  
    
    let str="";
    for(let i in adminList){
          if(adminList[i]===null){
              continue;
          }
              
          str+=`
          <div class="itemAdmin">
                        <div id="dialogBox" class="hidden remove${i}">
                            <div class="stergereProdus">
                                <p class="mesaj stergereElement${i}"></p>
                                <p class="mesaj">Confirmi stergerea?</p>
                                <button type="submit" class="confirmare" onclick="confirmareStergere(event);" id="${i}">DA</button>
                                <button type="submit" class="refuz" onclick="refuzStergere(event);">NU</button>          
                            </div>
                        </div>
                    <div class="imagineAdmin">
                        <img src="${adminList[i].imagine}" class="imgAdmin"/>
                    </div>
                    <div class="numeAdmin">
                        <a><span>${adminList[i].nume}</span></a>
                    </div>
                    <div class="pretAdmin">
                        <span>${adminList[i].pret}</span>
                    </div>
                    <div class="stocAdmin">
                        <span>${adminList[i].stoc}</span>
                    </div>
                    <div class="removeAdmin">
                        <button onclick="showDiv(event)"; id="${i}">Remove</button>
                    </div>
                    <div class="editAdmin">
                        <a href="edit.html?id=${i}"><button>Edit</button></a>
                    </div>
                </div>     
  
     `
    }
     
    document.querySelector(".tableBody").innerHTML = str;
}
function showDiv(event){
    let item = event.target;
    let itemId = item.id;
    document.querySelector(`.stergereElement${itemId}`).textContent=`Esti pe cale sa stergi produsul "${adminList[itemId].nume}"`;
    document.querySelector(`.remove${itemId}`).classList.remove("hidden");
    document.body.classList.add("overflowHidden")
    
}
async function confirmareStergere(event){
 let itemConfirmed = event.target;
 console.log(itemConfirmed)
 let idx = itemConfirmed.id;
    console.log(idx);
 document.querySelector("#dialogBox").classList.add("hidden");
 document.body.classList.remove("overflowHidden")
 var response = await fetch(`https://final-project-corect.firebaseio.com/${idx}.json`,{
        method:"DELETE"
    });
  getAdmin();
 
}
function refuzStergere(event){
    
    document.querySelector("#dialogBox").classList.add("hidden");
    document.body.classList.remove("overflowHidden")
}