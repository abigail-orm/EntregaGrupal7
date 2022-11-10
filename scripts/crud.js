"use strict";

const URL = "https://6362dab637f2167d6f6e580b.mockapi.io/users/";

let BTN_SEARCH = document.getElementById("btnGet1");
let BTN_POST = document.getElementById("btnPost");
let BTN_PUT = document.getElementById("btnPut");
let BTN_DELETE = document.getElementById("btnDelete");
let BTN_MODAL_PUT = document.getElementById('btnSendChanges')


const CONTAINER = document.getElementById("results");


let data;

async function fetchApi(method, endpoint = "") {
  let info = await fetch(URL + endpoint);
  data = await info.json();

  method: method;
  return data;
}


//GET
BTN_SEARCH.onclick = async () => {
  await fetchApi("GET");
  getAllData()
};


//Funcion que trae los datos
async function getAllData(){
  const SEARCH_ID_FILTER = document.getElementById("inputGet1Id").value - 1;
  const SEARCH_ID = document.getElementById("inputGet1Id").value;
  let contenido = ""
  if (SEARCH_ID == "") {
    data.forEach((post) => {
      /* const li = document.createElement("li"); */
      contenido += `ID: ${post.id}<br>NAME: ${post.name}<br>LASTNAME: ${post.lastname}<hr>`;
      /* li.innerHTML = `ID: ${post.id}<br>NAME: ${post.name}<br>LASTNAME: ${post.lastname}<hr>`;
      CONTAINER.appendChild(li); */
      CONTAINER.innerHTML = contenido;
      btnEnable();
    });
  } else{
   let idFiltrado = "";
   let elementoId = await fetch(URL+SEARCH_ID)
    idFiltrado = await elementoId.json()
    console.log(idFiltrado)
    if(elementoId.ok){
    contenido = `ID: ${idFiltrado.id}<br>NAME: ${idFiltrado.name}<br>LASTNAME: ${idFiltrado.lastname}<hr>`
    CONTAINER.innerHTML = contenido
    btnEnable();
    }else{
    Swal.fire({
      title: "ha ocurrido un error",
      text: "No se encontro el ID",
      icon: "error",
      backdrop: true,
      timer: 2000,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      showConfirmButton: false,
    });
  }  
  }
}

//POST
BTN_POST.onclick = async () => {
  const POST_NAME = document.getElementById("inputPostNombre").value;
  const POST_LASTNAME = document.getElementById("inputPostApellido").value;
  await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      name: POST_NAME,
      lastname: POST_LASTNAME,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  Swal.fire({
    title: "Usuario agregado",
    text: "El usuario "+POST_NAME+" "+POST_LASTNAME+" se agrego",
    icon: "success",
    backdrop: true,
    timer: 2000,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    showConfirmButton: false,
  });
};


//DELETE
BTN_DELETE.onclick = async () => {
  const DELETE_INPUT = document.getElementById("inputDelete").value;
  await fetch(URL + DELETE_INPUT, {
    method: "DELETE",   
 });;
 Swal.fire({
  title: "Usuario eliminado",
  text: "El usuario con la ID "+DELETE_INPUT+" se elimino",
  icon: "success",
  backdrop: true,
  timer: 2000,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  showConfirmButton: false,
});
};


//PUT
BTN_PUT.onclick = async()=>{
  const PUT_INPUT_ID = document.getElementById('inputPutId').value
  await fetch(URL + PUT_INPUT_ID, {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
}

//MODAL PUT
BTN_MODAL_PUT.onclick = async () =>{
  const PUT_INPUT_ID = document.getElementById('inputPutId').value
  const PUT_NAME = document.getElementById('inputPutNombre').value
  const PUT_LASTNAME = document.getElementById('inputPutApellido').value
await fetch(URL+PUT_INPUT_ID,{
  method: "PUT",
  body: JSON.stringify({
    name: PUT_NAME,
    lastname: PUT_LASTNAME,
  }),
  headers: { "Content-type": "application/json; charset=UTF-8" },
})

}





function btnEnable() {
  BTN_POST.removeAttribute("disabled", "");
  BTN_PUT.removeAttribute("disabled", "");
  BTN_DELETE.removeAttribute("disabled", "");
}

function btnDisable() {
  BTN_POST.setAttribute("disabled", "");
  BTN_PUT.setAttribute("disabled", "");
  BTN_DELETE.setAttribute("disabled", "");
}
btnDisable();

