let cartList = {};
async function getCart(){
let cart = JSON.parse(localStorage.getItem("cart"));
let response = await fetch("https://final-project-corect.firebaseio.com/.json");
    cartList = await response.json();
let cartStr="";
    document.querySelector(".cartWrap").classList.remove("hidden");
    document.querySelector("#spinner").classList.add("hidden");

    for(let i in cart){
        cartStr +=`
        <div class="item" id="divRemoved${i}">
            <div class="imagineCos">
                <img src="${cart[i].imagine}" class="imagineCart"/>
            </div>
        
            <div class="name">
                <a href="details.html?id=${cart[i].id}"><span>${cartList[cart[i].id].nume}</span></a>
            </div>
            <div class="quantity">
                <button class="plus-btn" type="button" name="button" onclick="increaseQuant(event,${i})">
                <img src="plus.svg">
                </button>
                <input type="text" name="finalQuant" id="quantInput${i}" value="${cart[i].cantitate}"  class="inputQuant">
                <button class="minus-btn" type="button" name="button" onclick="decreaseQuant(event,${i});">
                <img src="minus.svg">
                </button>
            </div>
            <div class="subtotal" id="sum${i}">${cart[i].cantitate*cartList[cart[i].id].pret} RON</div>
            <div class="remove"><button class="removeBtn" onclick="removeItem(${i});">Remove</button></div>        
        </div>     
    
    `
    }

    let sum=0;
    let nrProd=0;
    for(let j in cart){
        sum = sum+cart[j].cantitate*cartList[cart[j].id].pret;
        nrProd = nrProd+cart[j].cantitate;
        cart[j].pret=cartList[cart[j].id].pret;
        localStorage.setItem("cart", JSON.stringify(cart));

    }
    
    document.querySelector(".cartWrap").innerHTML = cartStr; 
    document.getElementById("prodAchizitionate").textContent=String(nrProd);
    document.getElementById("sumaTotal").textContent=String(sum)+" RON";

}
 function increaseQuant(event,idx){
    let index = idx;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newCantBuyed = cart[index].cantitate+1;

    if(newCantBuyed > cart[index].stoc){
        alert("Ati depasit stocul!");
    } else{
        cart[index].cantitate = newCantBuyed;
        cart[index].pretTotal = newCantBuyed*cart[index].pret;
        localStorage.setItem("cart", JSON.stringify(cart));

        let numarProdusePlus = Number(document.getElementById("prodAchizitionate").textContent);
        let newProd = numarProdusePlus+1;
        document.getElementById("prodAchizitionate").textContent=String(newProd);

        let sumaTotalPlus = document.getElementById("sumaTotal").textContent;
        let sumaTotalPlusCon = Number(sumaTotalPlus.substr(0,sumaTotalPlus.indexOf("RON")-1));
        let newSumPlus = sumaTotalPlusCon + Number(cart[index].pret);
        document.getElementById("sumaTotal").textContent= String(newSumPlus)+ " RON";

        
        let quantInput = document.getElementById(`quantInput${index}`);
        quantInput.value = newCantBuyed; 

        let subtotalPlus = document.getElementById(`sum${index}`);
        let subtotalPricePlus= newCantBuyed* cart[index].pret;
        subtotalPlus.textContent= String(subtotalPricePlus)+" RON";      
    }
}
function decreaseQuant(event,idx){
    let id = idx;
    let cart=JSON.parse(localStorage.getItem("cart"));
    let newCantDecrease = cart[id].cantitate-1;
    if(newCantDecrease <=0 ){
        alert("Selectati o cantitate valida!");

    }
    else{
        cart[id].cantitate = newCantDecrease;
        cart[id].pretTotal = newCantDecrease*cart[id].pret;
        localStorage.setItem("cart", JSON.stringify(cart));

        let quantInputMinus = document.getElementById(`quantInput${id}`);
        quantInputMinus.value = newCantDecrease; 

        let numarProduseMinus = Number(document.getElementById("prodAchizitionate").textContent);
        let newProdMinus = numarProduseMinus-1;
        document.getElementById("prodAchizitionate").textContent=String(newProdMinus);

        let sumaTotalMinus = document.getElementById("sumaTotal").textContent;
        let sumaTotalMinusCon = Number(sumaTotalMinus.substr(0,sumaTotalMinus.indexOf("RON")-1));
        let newSumMinus = sumaTotalMinusCon - cart[id].pret;
        document.getElementById("sumaTotal").textContent= String(newSumMinus)+ " RON";


        let subtotalMinus = document.getElementById(`sum${id}`);
        let subtotalPriceMinus= newCantDecrease*cart[id].pret;
        subtotalMinus.textContent= String(subtotalPriceMinus)+" RON";
         
    }  
}
function removeItem(idx){

     let idxR = idx;
     let cart=JSON.parse(localStorage.getItem("cart"));
     let itemRemoved = document.getElementById(`divRemoved${idxR}`);
     itemRemoved.classList.add("hidden");
     let removeQuant = cart[idxR].cantitate;
     let removeSum = cart[idxR].pretTotal;
     let quantBeforeRemove = Number(document.getElementById("prodAchizitionate").textContent);
     let sumBeforeRemove = Number(document.getElementById("sumaTotal").textContent);
     document.getElementById("prodAchizitionate").textContent=String(quantBeforeRemove-removeQuant);
     document.getElementById("sumaTotal").textContent=String(sumBeforeRemove-removeSum);



     cart.splice(idxR,1);
     localStorage.setItem("cart", JSON.stringify(cart));
     getCart();
}
//PUT index si proprietatea, la body ii dai doar valoarea, nu obiectul 

async function cumpara(){
    let cart= JSON.parse(localStorage.getItem("cart"));
    await Promise.all(cart.map((produs)=>{
        let stocRamas = produs.stoc - produs.cantitate;
        let index = produs.id;
        
        return fetch(`https://final-project-corect.firebaseio.com/${index}/stoc.json`,{
            method:"PUT",
            body:stocRamas
    
        });
    }))
    


}

