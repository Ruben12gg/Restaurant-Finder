// Adiciona as categorias ao select
const getCategories = async () => {
  const data = await fetch("https://developers.zomato.com/api/v2.1/cuisines?city_id=811", {

    headers: {
      "user-key": "25871f706a349fe803fdb06e891f1069",
    },
    method: 'GET',
  })
  const json = await data.json()
  console.log(json);

  for (let i = 0; i < json.cuisines.length; i++) {
    const element = json.cuisines[i];

    document.querySelector("#sltCategories").innerHTML += `<option value=${element.cuisine.cuisine_name}>${element.cuisine.cuisine_name}</option> `
  }

}
getCategories()

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', async e => {

  e.preventDefault()
  let cityElement = document.querySelector("#citySelector")
  let cityValue = cityElement.options[cityElement.selectedIndex].value
  console.log(cityValue);

  let cuisineElement = document.querySelector("#sltCategories")
  let cuisineValue = cuisineElement.options[cuisineElement.selectedIndex].value
  console.log(cuisineValue);

  const data = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityValue}&entity_type=city&cuisines=${cuisineValue}`
    , {

      headers: {
        "user-key": "25871f706a349fe803fdb06e891f1069",
      },
      method: 'GET',
    })

  const json = await data.json()
  console.log(json);

  //contagem de resultados encontrados
  console.log(json.results_found);

  for (let i = 0; i < json.restaurants.length; i++) {
    const element = json.restaurants[i];

    //Resultados por Pesquisa
    document.getElementById("output").innerHTML += `
    <div class="teste">
      <h2>${element.restaurant.name}</h2>
      <p>Morada: ${element.restaurant.location.address} </p>
      <p>Horários de Funcionamento: <b>${element.restaurant.timings}</b> </p>
      <p>Especialidades: ${element.restaurant.cuisines} </p>
      <p>Contacto: <span><b><a href="tel:${element.restaurant.phone_numbers}"> ${element.restaurant.phone_numbers}</a></b> </span></p>
      <img src="${element.restaurant.featured_image}" width=30%>
   </div>
      <hr>
    
    `

  }


  //listener para button de limpar resultados
  document.getElementById("clearResults").addEventListener("click", removeContent);
  console.log("O conteudo de pesquisas foi eliminado!");
  //limpeza de resultados
  function removeContent() {
    Swal.fire('Resultados limpos!')

    document.getElementById("output").innerHTML = ` `
  }


});


//botao voltar ao topo
let mybutton = document.getElementById("myBtn");

// mostrar botão após 50px de scroll
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// funçao de voltar ao topo
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//return home
document.getElementById("return").onclick = function () {
  location.href = "../../index.html"
}