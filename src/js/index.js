const buscador = document.getElementById("botonBuscar");
const random = document.getElementById("botonRandom");
const listaDeComida = document.getElementById("comida");


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
        listaDeComida.classList.add("sinCoinsidencia");
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
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${articulo.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
