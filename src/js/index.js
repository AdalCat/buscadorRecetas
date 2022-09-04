const buscador = document.getElementById("botonBuscar");
const random = document.getElementById("botonRandom");
const listaDeComida = document.getElementById("comida");
const botonVolver = document.getElementById('buttonBack')
const inputBuscar = document.getElementById('inputBuscar')

// Al cargar la aplicación, borra el contenido del input si hay algo y muestra recetas aleatorias con base en una letra del abecedario (eliminé las letras que no tienen recetas o solo tienen 1 o 2)
window.addEventListener('load', randomFunction)

function randomFunction() {
  const alphabet = "abcdefghjklmnprstv"
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${randomCharacter}`)
  .then((response) => response.json())
    .then((data) => {
      listaDeComida.innerHTML = ""
      if (data.meals) {
        data.meals.forEach((comida) => {

      // Creamos toda la card
      const cardFragment = document.createDocumentFragment();
      let comidaArticulo = cardFragment
        .appendChild(document.createElement('div'))
      comidaArticulo.className = ('comida-articulo')
      comidaArticulo.dataset.id = comida.idMeal

      // Div de la imagen
      let contenedorImagen = comidaArticulo
        .appendChild(document.createElement('div'))
      contenedorImagen.className = ('comida-imagen')

      let imagenComida = contenedorImagen
        .appendChild(document.createElement('img'))
        imagenComida.src = comida.strMealThumb
        imagenComida.alt = ('Imagen de la receta')
        imagenComida.className = ('comida-boton')
      
      // Div del nombre de la receta
      let contenedorComida = comidaArticulo
        .appendChild(document.createElement('div'))
        contenedorComida.className = ('comida-nombre')

      let nombreComida = contenedorComida
        .appendChild(document.createElement('h3'))
        nombreComida.textContent = comida.strMeal
        
        listaDeComida.append(comidaArticulo)

        })};
        /* listaDeComida.innerHTML = html; */
        botonVolver.style.display = 'none'
        listaDeComida.classList.remove('sinCoincidencia')
        botonVolver.href = '../index.html'
    })}
    document.getElementById('inputBuscar').value = ''


// Al hacer click en el botón Random
// random.addEventListener("click", randomFunction);


// Al hacer click en el botón Buscar
buscador.addEventListener("click", consulta);

// Al darle enter tras escribir la búsqueda
inputBuscar.addEventListener("keypress", function(event){
  if (event.key === 'Enter') {
    consulta()
  }
})

function consulta() {
  let busqueda = document.getElementById("inputBuscar").value.trim();
  if (busqueda !== '') {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${busqueda}`)
    .then((response) => response.json())
    .then((data) => {
      listaDeComida.innerHTML = ""
      if (data.meals) {
        data.meals.forEach((comida) => {
      
      // Creamos toda la card
      const cardFragment = document.createDocumentFragment();
      let comidaArticulo = cardFragment
        .appendChild(document.createElement('div'))
      comidaArticulo.className = ('comida-articulo')
      comidaArticulo.dataset.id = comida.idMeal

      // Div de la imagen
      let contenedorImagen = comidaArticulo
        .appendChild(document.createElement('div'))
      contenedorImagen.className = ('comida-imagen')

      let imagenComida = contenedorImagen
        .appendChild(document.createElement('img'))
        imagenComida.src = comida.strMealThumb
        imagenComida.alt = ('Imagen de la receta')
        imagenComida.className = ('comida-boton')
      
      // Div del nombre de la receta
      let contenedorComida = comidaArticulo
        .appendChild(document.createElement('div'))
        contenedorComida.className = ('comida-nombre')

      let nombreComida = contenedorComida
        .appendChild(document.createElement('h3'))
        nombreComida.textContent = comida.strMeal
        
        listaDeComida.append(comidaArticulo)
        listaDeComida.classList.remove('sinCoincidencia')
                      });
                      // En caso de no encontrar una receta
                    } else {
                      listaDeComida.innerHTML = "No se han encontrado recetas con ese nombre"
                      listaDeComida.classList.add("sinCoincidencia")
        }
          botonVolver.style.display = 'none'
      });
    }
  }

// Función para mostrar una receta aleatoria
random.addEventListener("click", aleatorio);
function aleatorio() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      listaDeComida.innerHTML = ''
      data.meals.forEach((comida) => {
      
      // Creamos toda la card
      const cardFragment = document.createDocumentFragment();
      let comidaArticulo = cardFragment
        .appendChild(document.createElement('div'))
      comidaArticulo.className = ('comida-articulo')
      /* comidaArticulo.dataset.id = articulo.dataset.id */
      

      // Div de la imagen
      let contenedorImagen = comidaArticulo
        .appendChild(document.createElement('div'))
      contenedorImagen.className = ('comida-imagen')

      let imagenComida = contenedorImagen
        .appendChild(document.createElement('img'))
        imagenComida.src = comida.strMealThumb
        imagenComida.alt = ('Imagen de la receta')
      
      // Div del nombre de la receta
      let contenedorComida = comidaArticulo
        .appendChild(document.createElement('div'))
        contenedorComida.className = ('comida-nombre')

      let nombreComida = contenedorComida
        .appendChild(document.createElement('h3'))
        nombreComida.textContent = comida.strMeal
      
      // Div de los ingredientes
      let comidaIngredientes = cardFragment
        .appendChild(document.createElement('div'))
        comidaIngredientes.className = ('comida-articulo')
      
      let nombreIngredientes = comidaIngredientes
        .appendChild(document.createElement('h5'))
        nombreIngredientes.textContent = ('Ingredients')
        nombreIngredientes.className = ('comida-nombre')

        
        //Conviriendo los contenidos de Json en un array
        mealArray = Object.values(data.meals[0]);
        var ingredientsList = [];
        var measuresList = [];

        //Obteniendo los ingredientes en un array
        for (let i = 9; i <= 28; i++) {
          if (!mealArray[i]) break;
          ingredientsList.push(mealArray[i]);
        }
        //Obteniendo las medidas en un array
        for (let i = 29; i <= 48; i++) {
          if (mealArray[i] === "" || mealArray[i] === " ") break;
          measuresList.push(mealArray[i]);
        }
        
        for (let c = 0; c < ingredientsList.length; c++) {
          listaIng = `${ingredientsList[c]}, ${measuresList[c]}`
        
        let ingredientesUnoPorUno = comidaIngredientes
          .appendChild(document.createElement('p'))
          ingredientesUnoPorUno.textContent = listaIng
        }

        // Div de la preparación
      let comidaPreparacion = cardFragment
        .appendChild(document.createElement('div'))
        comidaPreparacion.className = ('comida-articulo')

      let nombrePreparacion = comidaPreparacion
        .appendChild(document.createElement('h5'))
        nombrePreparacion.textContent = ('Instructions')
        nombrePreparacion.className = ('comida-nombre')

      let recetaPreparacion = comidaPreparacion
        .appendChild(document.createElement('p'))
        recetaPreparacion.textContent = comida.strInstructions
        recetaPreparacion.className = ('comida-nombre')

      listaDeComida.append(comidaArticulo, comidaIngredientes, comidaPreparacion)
        
      botonVolver.style.display = 'block'
      })
    })
  }

// Funcion para obtener el id de la receta
listaDeComida.addEventListener("click", obtenerId);
function obtenerId(e) {
  e.preventDefault();
  if (e.target.classList.contains("comida-boton")) {
    let articulo = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${articulo.dataset.id}`)
    .then((response) => response.json())
    .then((data) => {
      listaDeComida.innerHTML = ''
      data.meals.forEach((comida) => {
      
      // Creamos toda la card
      const cardFragment = document.createDocumentFragment();
      let comidaArticulo = cardFragment
        .appendChild(document.createElement('div'))
      comidaArticulo.className = ('comida-articulo')
      comidaArticulo.dataset.id = articulo.dataset.id
      

      // Div de la imagen
      let contenedorImagen = comidaArticulo
        .appendChild(document.createElement('div'))
      contenedorImagen.className = ('comida-imagen')

      let imagenComida = contenedorImagen
        .appendChild(document.createElement('img'))
        imagenComida.src = comida.strMealThumb
        imagenComida.alt = ('Imagen de la receta')
      
      // Div del nombre de la receta
      let contenedorComida = comidaArticulo
        .appendChild(document.createElement('div'))
        contenedorComida.className = ('comida-nombre')

      let nombreComida = contenedorComida
        .appendChild(document.createElement('h3'))
        nombreComida.textContent = comida.strMeal
      
      // Div de los ingredientes
      let comidaIngredientes = cardFragment
        .appendChild(document.createElement('div'))
        comidaIngredientes.className = ('comida-articulo')
      
      let nombreIngredientes = comidaIngredientes
        .appendChild(document.createElement('h5'))
        nombreIngredientes.textContent = ('Ingredients')
        nombreIngredientes.className = ('comida-nombre')

        
        //Conviriendo los contenidos de Json en un array
        mealArray = Object.values(data.meals[0]);
        var ingredientsList = [];
        var measuresList = [];

        //Obteniendo los ingredientes en un array
        for (let i = 9; i <= 28; i++) {
          if (!mealArray[i]) break;
          ingredientsList.push(mealArray[i]);
        }
        //Obteniendo las medidas en un array
        for (let i = 29; i <= 48; i++) {
          if (mealArray[i] === "" || mealArray[i] === " ") break;
          measuresList.push(mealArray[i]);
        }
        
        for (let c = 0; c < ingredientsList.length; c++) {
          listaIng = `${ingredientsList[c]}, ${measuresList[c]}`
        
        let ingredientesUnoPorUno = comidaIngredientes
          .appendChild(document.createElement('p'))
          ingredientesUnoPorUno.textContent = listaIng
        }

        // Div de la preparación
      let comidaPreparacion = cardFragment
        .appendChild(document.createElement('div'))
        comidaPreparacion.className = ('comida-articulo')

      let nombrePreparacion = comidaPreparacion
        .appendChild(document.createElement('h5'))
        nombrePreparacion.textContent = ('Instructions')
        nombrePreparacion.className = ('comida-nombre')

      let recetaPreparacion = comidaPreparacion
        .appendChild(document.createElement('p'))
        recetaPreparacion.textContent = comida.strInstructions
        recetaPreparacion.className = ('comida-nombre')

      listaDeComida.append(comidaArticulo, comidaIngredientes, comidaPreparacion)
        
      botonVolver.style.display = 'block'
      })
      });
  }
}