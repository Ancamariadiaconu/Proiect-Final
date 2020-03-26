var list=[];
async function getProductEdit(){
    var idx=window.location.search.substr(4);
    var response = await fetch("https://final-project-corect.firebaseio.com/.json");
    window.list = await response.json();
    document.querySelector("[name='nume']").value=list[idx].nume;
    document.querySelector("[name='url']").value=list[idx].imagine;
    document.querySelector("[name='descriere']").value=list[idx].descriere;
    document.querySelector("[name='pret']").value=list[idx].pret;
    document.querySelector("[name='stoc']").value=list[idx].stoc;
}
async function editeazaProdus(){
event.preventDefault();
var index=window.location.search.substr(4);
var produsNou={
    nume:document.querySelector("[name='nume']").value,
    imagine:document.querySelector("[name='url']").value,
    descriere:document.querySelector("[name='descriere']").value,
    pret:document.querySelector("[name='pret']").value,
    stoc: document.querySelector("[name='stoc']").value
 };
var response = await fetch(`https://final-project-corect.firebaseio.com/${index}.json`,{
                    method:"PUT",
                    body:JSON.stringify(produsNou)
                });
               
                window.location.assign("admin.html");
}

