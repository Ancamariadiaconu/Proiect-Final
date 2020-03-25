function getCart(){
let cart = JSON.parse(localStorage.getItem("listObjBuyed"));
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
                <a href="details.html?id=${cart[i].id}"><span>${cart[i].nume}</span></a>
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
            <div class="subtotal" id="sum${i}">${cart[i].pretTotal} RON</div>
            <div class="remove"><button class="removeBtn" onclick="removeItem(${i});">Remove</button></div>        
        </div>     
    
    `
    }

    let sum=0;
    let nrProd=0;
    for(let j in cart){
        sum=sum+cart[j].pretTotal;
        nrProd=nrProd+cart[j].cantitate;

    }
    
    document.querySelector(".cartWrap").innerHTML = cartStr; 
    document.getElementById("prodAchizitionate").textContent=String(nrProd);
    document.getElementById("sumaTotal").textContent=String(sum)+" RON";

}
function increaseQuant(event,idx){
    let index = idx;
    let listObjBuyed = JSON.parse(localStorage.getItem("listObjBuyed"));
    let newCantBuyed = listObjBuyed[index].cantitate+1;

    if(newCantBuyed > listObjBuyed[index].stoc){
        alert("Ati depasit stocul!");
    } else{
        listObjBuyed[index].cantitate = newCantBuyed;
        listObjBuyed[index].pretTotal = newCantBuyed*listObjBuyed[index].pret;
        localStorage.setItem("listObjBuyed", JSON.stringify(listObjBuyed));

        let numarProdusePlus = Number(document.getElementById("prodAchizitionate").textContent);
        let newProd = numarProdusePlus+1;
        document.getElementById("prodAchizitionate").textContent=String(newProd);

        let sumaTotalPlus = document.getElementById("sumaTotal").textContent;
        let sumaTotalPlusCon = Number(sumaTotalPlus.substr(0,sumaTotalPlus.indexOf("RON")-1));
        let newSumPlus = sumaTotalPlusCon + Number(listObjBuyed[index].pret);
        console.log(newSumPlus);
        document.getElementById("sumaTotal").textContent= String(newSumPlus)+ " RON";

        
        let quantInput = document.getElementById(`quantInput${index}`);
        quantInput.value = newCantBuyed; 

        let subtotalPlus = document.getElementById(`sum${index}`);
        let subtotalPricePlus= newCantBuyed* listObjBuyed[index].pret;
        subtotalPlus.textContent= String(subtotalPricePlus)+" RON";      
    }
}
function decreaseQuant(event,idx){
    let id = idx;
    let listObjBuyed=JSON.parse(localStorage.getItem("listObjBuyed"));
    let newCantDecrease = listObjBuyed[id].cantitate-1;
    if(newCantDecrease <=0 ){
        alert("Selectati o cantitate valida!");

    }
    else{
        listObjBuyed[id].cantitate = newCantDecrease;
        listObjBuyed[id].pretTotal = newCantDecrease*listObjBuyed[id].pret;
        localStorage.setItem("listObjBuyed", JSON.stringify(listObjBuyed));

        let quantInputMinus = document.getElementById(`quantInput${id}`);
        quantInputMinus.value = newCantDecrease; 

        let numarProduseMinus = Number(document.getElementById("prodAchizitionate").textContent);
        let newProdMinus = numarProduseMinus-1;
        document.getElementById("prodAchizitionate").textContent=String(newProdMinus);

        let sumaTotalMinus = document.getElementById("sumaTotal").textContent;
        let sumaTotalMinusCon = Number(sumaTotalMinus.substr(0,sumaTotalMinus.indexOf("RON")-1));
        let newSumMinus = sumaTotalMinusCon - listObjBuyed[id].pret;
        document.getElementById("sumaTotal").textContent= String(newSumMinus)+ " RON";


        let subtotalMinus = document.getElementById(`sum${id}`);
        let subtotalPriceMinus= newCantDecrease*listObjBuyed[id].pret;
        subtotalMinus.textContent= String(subtotalPriceMinus)+" RON";
         
    }  
}
function removeItem(idx){

     let idxR = idx;
     let listObjBuyed=JSON.parse(localStorage.getItem("listObjBuyed"));
     let itemRemoved = document.getElementById(`divRemoved${idxR}`);
     itemRemoved.classList.add("hidden");
     let removeQuant = listObjBuyed[idxR].cantitate;
     let removeSum = listObjBuyed[idxR].pretTotal;
     let quantBeforeRemove = Number(document.getElementById("prodAchizitionate").textContent);
     let sumBeforeRemove = Number(document.getElementById("sumaTotal").textContent);
     document.getElementById("prodAchizitionate").textContent=String(quantBeforeRemove-removeQuant);
     document.getElementById("sumaTotal").textContent=String(sumBeforeRemove-removeSum);



     listObjBuyed.splice(idxR,1);
     localStorage.setItem("listObjBuyed", JSON.stringify(listObjBuyed));
     getCart();
}
//PUT index si proprietatea, la body ii dai doar valoarea, nu obiectul 

async function cumpara(){
    let listObjBuyed = JSON.parse(localStorage.getItem("listObjBuyed"));
    await Promise.all(listObjBuyed.map((produs)=>{
        let stocRamas = produs.stoc - produs.cantitate;
        let index = produs.id;
        
        return fetch(`https://final-project-corect.firebaseio.com/${index}/stoc.json`,{
            method:"PUT",
            body:stocRamas
    
        });
    }))
    


}

