async function adaugaProdusNou(event){
    event.preventDefault();
    var produsNou = {
        imagine:document.querySelector("[name='url']").value,
        nume:document.querySelector("[name='nume']").value,
        descriere: document.querySelector("[name='descriere']").value,
        pret: document.querySelector("[name='pret']").value,
        stoc:  document.querySelector("[name='stoc']").value
        
    };
    
        var response = await fetch(`https://final-project-corect.firebaseio.com/.json`,{
            method:"POST",
            body:JSON.stringify(produsNou)
        });
        window.location.assign("admin.html");
  }