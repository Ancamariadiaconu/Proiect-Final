let list={};
async function getList(){
    let response = await fetch("https://final-project-corect.firebaseio.com/.json");
    list = await response.json();
    drawProductsInCart();
    draw();
}
function drawProductsInCart(){

    let nrOfProductsInCart=0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let dinamicCartContent = document.querySelector(".dinamicCart");
  
  for(let i in cart){
      nrOfProductsInCart+= cart[i].cantitate
  }
  if(nrOfProductsInCart!=0){
  
  dinamicCartContent.textContent = String(nrOfProductsInCart);
  dinamicCartContent.classList.remove("hidden");
  }
}
function draw(){
    let str="";
    document.querySelector(".showProducts").classList.remove("hidden");
    document.querySelector("#spinner").classList.add("hidden");

    let url = new URL(window.location.search, window.location);
    let searchParams = url.searchParams;
    let input = "";
    
        for(let [key,val] of searchParams){
                console.log(key,val);
                
	            if(key==="id"){
		        input=val;
		        break;
                }
            }

    let found = false;
    for(let i in list){
        if(list[i].nume.toLowerCase().indexOf(input) > -1 || list[i].descriere.toLowerCase().indexOf(input) > -1){
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
    if(list[i].nume.toLowerCase().indexOf(input) !== -1 || list[i].descriere.toLowerCase().indexOf(input) !== -1) {
        found = true;
    }
}
if(input === ""){

}else if(found === false){
    
   
    document.querySelector(".message").classList.remove('hidden');
    document.querySelector(".message").innerHTML = `Your search for "${input}" did not yield any results `;
    
    
}else{
    
    document.querySelector(".message").classList.remove('hidden');
    document.querySelector(".message").innerHTML = `Search results for "${input}"... `;
    document.querySelector(".modalInput").value = "";
    document.querySelector(".search").value = "";

    }
      document.querySelector(".showProducts").innerHTML = str;
  } 

function showModalMobile(){
 document.querySelector(".modalSearch").classList.add("showModalMobile");
 document.querySelector(".icon-mobile").classList.add("hidden");

}
function hideModal(){
    document.querySelector(".modalSearch").classList.remove("showModalMobile");
    document.querySelector(".icon-mobile").classList.remove("hidden");

}
function mobileSearch(){
    let input = document.querySelector(".modalInput").value;
    window.location = "magazinVirtual.html?id="+input;
    return;

}
function desktopSearch(){
    let input = document.querySelector(".search").value;
    window.location = "magazinVirtual.html?id="+input;
    return;

}

  