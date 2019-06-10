
let input = document.getElementById("input");
let lista = document.getElementById("lista");
let todos = {
0:{
text: "Ir al cine",
done: false
},
1:{
text: "Cenar",
done : true 
},
2:{
text:"Grabar",
done : false
}

}; 

// function                                                    // esta funcion casi podria llamarle render por que lo que hace dibujar todo
function drawTodos() { 
 lista.innerHTML = " ";                                         // borramos la lista 
 for(let key in todos){                                        // recorremos los todos 
  let li =  document.createElement("li");                       // por cada todo que hagamos un li

//li.id= key;                                                   // le pasamos la key 
                                                                // le pasamos la estructura  del todo con los spans 

let classDone = todos[key].done ? "done" : ""  ;                                     

li.innerHTML= `    
   <span id="${key}" class="${classDone}"> ${todos[key].text}</span>
   <span data-id=${key} data-action="delete">X</span>
    `;

setListeners(li);                                                  // escucha las funciones siguientes
lista.appendChild(li);                                              // y lo ponemos en la lista


}
};

function setListeners(li) {
li.addEventListener("click", e => {                             // escucha la los eventos  en este caso el clik para marcarle nombre o alguien le da a la x

if (e.target.getAttribute("data-action")=== "delete") {
let key = e.target.getAttribute("data-id");

delete todos[key];                                                //sin redux tendriamos que marcar manualmente que dibuje cada todos 
drawTodos();
return;

}
let key = e.target.id;
  todos[key].done = !todos[key].done;
  drawTodos();

});
}



// listeners

input.addEventListener("keydown", e => {           // eventos de listener para crear un todo nuevo
if(e.key === "Enter") {
let text = e.target.value;


let id = Object.keys(todos).length;
todos[id] = {text, donde : false};
drawTodos();
}

});

//init
drawTodos();
 



