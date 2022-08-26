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
      let html = "";
      if (data.meals) {
        data.meals.forEach((comida) => {
          html += `
                <div class="comida-articulo" data-id = "${comida.idMeal}">
                    <div class="comida-imagen">
                        <img src="${comida.strMealThumb}" alt="Imagen de la receta" class="comida-boton">
                    </div>
                    <div class="comida-nombre">
                        <h3>${comida.strMeal}</h3>
                    </div>
                </div>
                `;
        })};
        listaDeComida.innerHTML = html;
        botonVolver.style.display = 'none'
        botonVolver.href = '../index.html'
    })}
    document.getElementById('inputBuscar').value = ''


// Al hacer click en el botón Random
random.addEventListener("click", randomFunction);


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
      let html = "";
      if (data.meals) {
        data.meals.forEach((comida) => {
          html += `
          <div class="comida-articulo" data-id = "${comida.idMeal}">
                    <div class="comida-imagen">
                      <img src="${comida.strMealThumb}" alt="Imagen de la receta" class="comida-boton">
                    </div>
                    <div class="comida-nombre">
                        <h3>${comida.strMeal}</h3>
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
          botonVolver.style.display = 'none'
      });
    }
  }


// Funcion para obtener el id de la receta
listaDeComida.addEventListener("click", obtenerId);
function obtenerId(e) {
  e.preventDefault();
  if (e.target.classList.contains("comida-boton")) {
    let articulo = e.target.parentElement.parentElement;
    console.log(articulo)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${articulo.dataset.id}`)
    .then((response) => response.json())
    .then((data) => {
      let html1 = '', html2 = ''
      listaDeComida.innerHTML = ''
      data.meals.forEach((comida) => {
        html1 += `
        <div class="comida-articulo" data-id = "${comida.idMeal}">
                  <div class="comida-imagen">
                      <img src="${comida.strMealThumb}" alt="Imagen de la receta">
                  </div>
                  <div class="comida-nombre">
                    <h3>${comida.strMeal}</h3>
                  </div>
                </div>
                <div class="comida-ingredientes">
                `
            let obj = Object.keys(comida)
            console.log(obj)
            // for (let i = 0; i < comida.; i++) {
            //     ingre = `comida.strIngredient${i}`
            //     console.log(ingre)
            // }
            html2 += `
            <h5>Ingredients</h5>
            <p>${comida.strIngredient1}, ${comida.strMeasure1}</p>
            </div>
            <div class="comida-preparacion">
            <h5>Recipe</h5>
            <p>${comida.strInstructions}</p>
            </div>
            `;
          })
          botonVolver.style.display = 'block'
        listaDeComida.innerHTML = html1 + html2;
      });
  }
}


// Función deprecada //

// function aleatorio() {
//   fetch("https://www.themealdb.com/api/json/v1/1/random.php")
//   .then((response) => response.json())
//   .then((data) => {
//     let html = "";
//       if (data.meals) {
//         data.meals.forEach((comida) => {
//           html += `
//             <div class="comida-articulo" data-id = "${comida.idMeal}">
//                 <div class="comida-imagen">
//                     <img src="${comida.strMealThumb}" alt="Imagen de la receta">
//                 </div>
//                 <div class="comida-nombre">
//                     <h3>${comida.strMeal}</h3>
//                     <a href="#" class="comida-boton">Ver receta</a>
//                 </div>
//             </div>
//             `;
//       });
//       }
//       listaDeComida.innerHTML = html;
//       // listaDeComida.appendChild(html) 
//     });
//   }