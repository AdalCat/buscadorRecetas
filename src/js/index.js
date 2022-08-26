const buscador = document.getElementById("botonBuscar");
const random = document.getElementById("botonRandom");
const listaDeComida = document.getElementById("comida");

// Al cargar la aplicación, borra el contenido del input si hay algo y muestra recetas aleatorias con base en una letra del abecedario (eliminé las letras que no tienen recetas o solo tienen 1 o 2)
window.addEventListener('load', function() {
  const alphabet = "abcdefghjklmnprstv"
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${randomCharacter}`)
  .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((comida) => {
          html += `
                <div class="comida-articulo" data-id = "${comida.idMeal}">
                    <div class="comida-imagen">
                        <img src="${comida.strMealThumb}" alt="Imagen de la receta">
                    </div>
                    <div class="comida-nombre">
                        <h3>${comida.strMeal}</h3>
                        <a href="#" class="comida-boton">Ver receta</a>
                    </div>
                </div>
                `;
        })};
        listaDeComida.innerHTML = html;
    })})
    document.getElementById('inputBuscar').value = ''


//Funcion random
random.addEventListener("click", aleatorio);

function aleatorio() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((response) => response.json())
  .then((data) => {
    let html = "";
      if (data.meals) {
        data.meals.forEach((comida) => {
          html += `
            <div class="comida-articulo" data-id = "${comida.idMeal}">
                <div class="comida-imagen">
                    <img src="${comida.strMealThumb}" alt="Imagen de la receta">
                </div>
                <div class="comida-nombre">
                    <h3>${comida.strMeal}</h3>
                    <a href="#" class="comida-boton">Ver receta</a>
                </div>
            </div>
            `;
      });
      }
      listaDeComida.innerHTML = html;
      // listaDeComida.appendChild(html) 
    });
  }


// Funcion buscar
buscador.addEventListener("click", consulta);

function consulta() {
  let busqueda = document.getElementById("inputBuscar").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${busqueda}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((comida) => {
          html += `
                <div class="comida-articulo" data-id = "${comida.idMeal}">
                    <div class="comida-imagen">
                        <img src="${comida.strMealThumb}" alt="Imagen de la receta">
                    </div>
                    <div class="comida-nombre">
                        <h3>${comida.strMeal}</h3>
                        <a href="#" class="comida-boton">Ver receta</a>
                    </div>
                </div>
                `;
        });
        // En caso de no encontrar una receta
      } else {
        html = "No se han encontrado recetas con ese nombre";
        listaDeComida.classList.add("sinCoincidencia");
      }

      listaDeComida.innerHTML = html;
    });
}


// Funcion para obtener el id de la receta
listaDeComida.addEventListener("click", obtenerId);
function obtenerId(e) {
  e.preventDefault();
  if (e.target.classList.contains("comida-boton")) {
    let articulo = e.target.parentElement.parentElement;
    console.log(articulo)
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${articulo.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        listaDeComida.innerHTML = ''
        data.meals.forEach((comida) => {
          html += `
                
          `;
        })
      });
  }
}