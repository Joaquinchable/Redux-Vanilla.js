//import * as Redux from "redux"
import {createStore} from "redux";                           // uso la desconstruccion para extraer solo esta funcion 
                                                             
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

// functions
     function drawTodos() { 
     lista.innerHTML = " ";                                 
     todos = store.getState();                          //actulizar los datos antes  de dibujar Redux
     for(let key in todos){                                  
     let li =  document.createElement("li");                  
    
     //li.id= key;                                             

     let classDone = todos[key].done ? "done" : ""  ;                                     
    
        li.innerHTML= `    
          <span id="${key}" class="${classDone}"> ${todos[key].text}</span>
         <span data-id=${key} data-action="delete">X</span>
    `;

    setListeners(li);
    lista.appendChild(li);


 }
};

function setListeners(li) {
 li.addEventListener("click", e => {
      
        if (e.target.getAttribute("data-action")=== "delete") {
          let key = e.target.getAttribute("data-id");
          store.dispatch({
              type:"DELETE_TODO",
              id: key
          });
          //delete todos[key]; sin redux tendriamos que marcar manualmente que dibuje cada todos 
          //drawTodos();
          return;

        }
 let key = e.target.id;
    
 todos[key].done = !todos[key].done;
     
    store.dispatch({
       type:"UPDATE_TODO",
       todo: todos[key]
      });
                  //todos[key].done = !todos[key].done;
                  //drawTodos();

});
}



// listeners

input.addEventListener("keydown", e => {
if(e.key === "Enter") {
    let text = e.target.value;
    let todo= {text, done: false};                // ya no aplicamos el id por que de eso ya se encarga Reducer
   store.dispatch({                               // dispatch nos permite lanza acciones hacia el reducer
   type: "ADD_TODO",
  todo
   });
  
  //let id = Object.keys(todos).length;           pediamos el texo del input creabamos un id que este id ya lo hace el reducer
    //todos[id] = {text, donde : false};          y modificamos a mano los todos 
   // drawTodos();                                 y dibujabamos lo todos  de esta manera ya basamos nuestra app en el estado y no lo hacemos a mao 
}

});

//init
//drawTodos();



//Redux


//reducer                                   // trabajamos los datos con reducer que se producen en el store
function todosReducers(state={},action)   {     // el reducer es el que modifica y decide que hacer con lo datos 
                                                // el store solo es el almasenaje
                                                 // el reducer no es mas que una funcion    
                                              // el action indica que hay que cambiar y el reducer se encarga de hacerlo
switch(action.type){
case "ADD_TODO":
    //state[Object.keys(state).length]=action.todo (estariamos mutando y Redux no puede manejar el satate mutandolo )
   action.todo["id"]= Object.keys(state).length;                   // el todo lleva consigo cual es su identficador con esto sabemos que todo actualizar 
   return  {...state, [Object.keys(state).lengths]: action.todo};// creamos un nuevo objeto apartir del state y sustituirlo 
case "UPDATE_TODO":
    return{...state,[action.todo.id]:action.todo};                      // rescribimos el id y devolvemos un objeto nuevo 
case "DELETE_TODO":
    delete state[action.id];                  //borramos del state el todo y devolvemo un state nuevo 
    return { ...state };
    default:
        return state;
}

}

//store

let store = createStore(todosReducers,{    // 1 iniciamos el store con un obejeto 
                                             // 2 Sustituir los todos con un unico todo 

0:{
text:"salir a correr",
done: true,
id: 0

}

});


//todos = store.getState();                           // sacamos el contenido de nuestro estado y nos entrega los todos 

//que Hacer cuando hay cambios?                        herramienta de store . idintifica que lago cambio 
  store.subscribe(drawTodos);                            // y con subscribe le indicamos que hacer cuando pasa el cambio
//calbakc si ejecusion solo cuando se requiera
//init
drawTodos();                                           // 3 dibujamos los todos 