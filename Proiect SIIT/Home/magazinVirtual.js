let list={};
async function getList(){
    let response = await fetch("https://final-project-corect.firebaseio.com/.json");
    list = await response.json();
    draw();
}
function draw(){
    document.querySelector(".showProducts").classList.remove("hidden");
    document.querySelector("#spinner").classList.add("hidden");
    let str="";
    for(let i in list){
          if(list[i]===null){
              continue;
          }
              
          str+=`<div class="col-xs-12 col-sm-6 col-lg-3">
                        <div class="childProduct">
                            
                            <img src="${list[i].imagine}" class="imagineProdus">
                
                            <div class="firstDetails">
                                    <p class=" info">${list[i].nume}</p></br>
                                    <div class="detRow">
                                        <span class="pret">${list[i].pret} RON</span>
                                        <a href="details.html?id=${i}"><button class="info detalii">Detalii</button></a>
                                    </div>
                            </div>    
                         </div>
                
            </div>
          `
      }
      document.querySelector(".showProducts").innerHTML = str;
  }
  