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
              
          str+=`<div class="itemAdmin">
                    <div class="stergereProdus hidden" id="formular${i}">
                    <p class="mesaj">Esti pe cale sa stergi produsul:"<span id="numeProdus${i}"></span>"</p>
                    <p class="mesaj">Confirmi stergerea?</p>
                    <button type="submit" class="confirmare" onclick="confirmareStergere(event);" id="${i}">Da</button>
                    <button type="submit" class="refuz" onclick="refuzStergere(event);" id="${i}">Nu</button>          
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
    let nameToDisplay = document.querySelector(`#numeProdus${itemId}`);
    nameToDisplay.textContent=adminList[itemId].nume;
    let removePop = document.getElementById(`formular${itemId}`);
    removePop.classList.remove("hidden");
    
}
async function confirmareStergere(event){
 let itemConfirmed= event.target;
 let idx=itemConfirmed.id;
 let removePop = document.getElementById(`formular${idx}`);
 removePop.classList.add("hidden");
 var response = await fetch(`https://final-project-corect.firebaseio.com/${idx}.json`,{
        method:"DELETE"
    });
  getAdmin();
 
}
function refuzStergere(event){
    let itemConfirmed= event.target;
    let idx=itemConfirmed.id;
    let removePop = document.getElementById(`formular${idx}`);
    removePop.classList.add("hidden");
}