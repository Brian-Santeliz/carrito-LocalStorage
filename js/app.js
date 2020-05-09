//variables
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
//eventListeners
eventListeners();
function eventListeners() {
  //se ejecuto cuanod precionan "agregar carrito"
  listaCursos.addEventListener("click", agregarCarrito);
  //se ejecuta cuando precionan para elimnar carrito
  carrito.addEventListener("click", eliminarCarrito);
  //se ejecuta cuando precionan vaciar carrito
  vaciarCarrito.addEventListener("click", vaciarCarritoFunction);
  //se ejecuta cuando el dom se termina de cargar. Imprime en la lista de carrito los cursos del LS.
  document.addEventListener("DOMContentLoaded", pintarDOMCursos);
}

//functions
//añade un carrito al curso
function agregarCarrito(e) {
  e.preventDefault();
  //delegarion para acceder a la clase agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

//crea un objeto para leer los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector(".imagen-curso").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector(".agregar-carrito").getAttribute("data-id"),
  };
  insertarCarrito(infoCurso);
  almacenarLocalStorage(infoCurso);
}

//insertar en el DOM el objeto de carrito
function insertarCarrito(curso) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>
        <img src = "${curso.imagen}" width="100">
    </td>    
    <td>
            ${curso.titulo}
        </td>
        
        <td>
            ${curso.precio}
         </td>
        <td>
            <a class="borrar-curso" href="#" data-id="${curso.id}">X</a>
        </td>
    `;
  listaCarrito.appendChild(tr);
}

//elima el elemento selccionando del carrito.
function eliminarCarrito(e) {
  e.preventDefault();

  //crea variables para acceder a la etqueta y los atributos.
  let curso, cursoId;
  //elimina el tr de la lista del carrito, solo cuando exista elementos.
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    //accede a la etiqueda td
    curso = e.target.parentElement;
    //accede a la etiqueda a y al atrubuto data-id que contiene el id del curso.
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }
  eliminarCarritoLocalStorage(cursoId);
}

//elimna todos los elemtos de la lista del carrito.
function vaciarCarritoFunction() {
  //  listaCarrito.innerHTML=''; //primera forma. Formatera el html a un string vacio.

  //seguando forma elimiando hijos del elemento.
  while (listaCarrito.firstElementChild) {
    listaCarrito.removeChild(listaCarrito.firstElementChild);
  }
  vaciarCarritoLS();
  return false;
}

//almacena en el local storage
function almacenarLocalStorage(curso) {
  let cursosAlmacena;

  //recibe el arrelgo de la function obtenerCursosLocalStorage
  cursosAlmacena = obtenerCursosLocalStorage();

  //agregar curso al arreglo
  cursosAlmacena.push(curso);

  //reescribe el valor del arreglo
  localStorage.setItem("cursos", JSON.stringify(cursosAlmacena));
}

//funcion para retornar un areglo de los cursos en el LS
function obtenerCursosLocalStorage() {
  let cursoLS;
  //comprobano si existe elemento en el localStorage
  if (localStorage.getItem("cursos") === null) {
    cursoLS = [];
  } else {
    cursoLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return cursoLS;
}

//pinta en el DOM los cursos del local storage
function pintarDOMCursos() {
  let cursosPintar;

  //recibiendo el arreglo de funcion obtenerLS
  cursosPintar = obtenerCursosLocalStorage();

  //recorriendo el arreglo y pintandolo en el DOM.
  cursosPintar.forEach((curso) => {
    //construyendo el template anteriormente definido.
    let tr = document.createElement("tr");

    tr.innerHTML = `
          <td>
              <img src = "${curso.imagen}" width="100">
          </td>    
          <td>
                  ${curso.titulo}
              </td>
              
              <td>
                  ${curso.precio}
               </td>
              <td>
                  <a class="borrar-curso" href="#" data-id="${curso.id}">X</a>
              </td>
          `;
    listaCarrito.appendChild(tr);
  });
}

//elimiando curso de localStorage
function eliminarCarritoLocalStorage(cursoId) {
  let cursoLSEliminar;

  //obtener arreglo
  cursoLSEliminar = obtenerCursosLocalStorage();

  cursoLSEliminar.forEach((curso, index) => {
    if (cursoId === curso.id) {
      cursoLSEliminar.splice(index, 1);
    }
  });
  //setear el arreglo actual al LS
  localStorage.setItem("cursos", JSON.stringify(cursoLSEliminar));
}

//funcion para elimnar los curso del LS con el boton "vaciar carrito"
function vaciarCarritoLS() {
  //vacia todos los elementos del ls
  localStorage.clear();
}
