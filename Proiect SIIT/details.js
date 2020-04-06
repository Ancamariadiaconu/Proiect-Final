let index=window.location.search.substr(4);
let detailList={};


async function getProductDetails(){
    let response = await fetch("https://final-project-corect.firebaseio.com/.json");
    detailList = await response.json();
    drawProductsInCart();
    drawDetails();
    drawCarousel();
    setCarousel();
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
function drawDetails(){
    document.querySelector(".productDetailsWrap").classList.remove("hidden");
    document.querySelector("#spinner").classList.add("hidden");
        let detailsStr="";
        detailsStr+=`

           
            <img class="imgDetails"src="${detailList[index].imagine}">
            <div class="productDetails">
                <p class="productName">${detailList[index].nume}</p>
                <p class="productPrice">${detailList[index].pret} RON</p>
                <p class="stoc">Numar produse stoc:<span class="nrStoc">${detailList[index].stoc}</span></p>
                <label for="cantitate">Cantitate</label>
                <input type="number" id="cantitate" value="1"></br>
                <button class="adaugareCos" onclick="addToCart();">Adauga in cos</button>
                <section class="description">${detailList[index].descriere}</section>
            </div>
        
        `
        document.querySelector(".productDetailsWrap").innerHTML=detailsStr;   
}
     function drawCarousel(){
        let carouselStr="";
        for(let i in detailList){
         carouselStr+=`
         <div class="carousel-cell">
            <img src="${detailList[i].imagine}"/>
         </div>
        
        `
        }
        document.querySelector(".carousel").innerHTML = carouselStr;
        
        
     }


 function addToCart(){
     
    let cant = Number(document.querySelector("#cantitate").value);
    let stoc = detailList[index].stoc;  
    let url = detailList[index].imagine;
    let nume = detailList[index].nume;
   
    
    
    let cart;
      
        //array of objects
    
        if(localStorage.getItem("cart")===null){
            cart =[];
        }else{
            cart = JSON.parse(localStorage.getItem("cart"));//transformarea string-ului din localstorage in array
         }
     let checker = false;
         for(let i in cart){
                 if(cart[i].id===index){
                    let newCant= cart[i].cantitate + cant;
                    if(newCant > stoc){
                        alert("Ati depasit stocul!");
                        checker=true;

                     }
                    else{
            
                        cart[i].cantitate= newCant;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        alert(""+name+ " a fost adaugat in cos");
                        checker=true;
                        drawProductsInCart(); 
                        
                    }          
                }
            }
            
         if(checker===false){
             if(cant>stoc){
                alert("ati depasit stocul!")
             }
             else{
                let objBuyed={};   
        
                 objBuyed={ 
                    "imagine": url,
                    "cantitate": cant,
                    "id": index,
                    "nume": nume,
                    "stoc": stoc,
                };
                cart.push(objBuyed);
        
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(""+nume+ " a fost adaugat in cos");
                drawProductsInCart();
      
            }       
        } 
            
}
function setCarousel(){
    let carouselContainer = $(".owl-carousel");
    carouselContainer.owlCarousel({
        responsive:{
            0:{
                items:1

            }

        },
        autoplay: true,
        loop: true
        

    });

    $(".leftButton").on("click", function (){
        carouselContainer.trigger("prev.owl.carousel")
    });
    
    $(".rightButton").on("click", function (){
        carouselContainer.trigger("next.owl.carousel")
    });
}



