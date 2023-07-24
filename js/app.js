const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso dando click en "agregar al carrito"
    listaCursos.addEventListener('click', agregaCurso);

    //Eliminar carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
	articulosCarrito = []; //Reseteamos el arreglo

	carritoHTML(); //Mandamos a llamar al HTML
    })


}


//Funciones
function agregaCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSelect = e.target.parentElement.parentElement;
        datosCurso(cursoSelect);
    }
}

function eliminarCurso(e) {
    
    if(e.target.classList.contains('borrar-curso')) {
	const cursoId = e.target.getAttribute('data-id');

	//Eliminar del arreglo de ArticulosCarrito por el data-id
	articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

	carritoHTML(); //Iterar sobre el carrito y monstrar su HTML.
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso.

function datosCurso(curso) {
    //console.log(curso)

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        Maestro: curso.querySelector('p').textContent,
        precio: curso.querySelector('p.precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //Actualiza la cantidad
        const cursos = articulosCarrito.map ( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; // Se retornan los objetos que no son los duplicados 
            }
        } );
        articulosCarrito = [...cursos];
    }else {
        //Agrega elementos al arreglo de carrito si solo es 1
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}


//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML()

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr'); //Creamos un table row
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="200">
            </td>
            <td>${titulo}</td>
            <td>${precio} </td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;

        //agrega el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);
    });

}

//Elimina los cursos tbody
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}
console.log('Hola mundo')
