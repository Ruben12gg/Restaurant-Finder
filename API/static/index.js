const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', async e => {
  /* console.log(document.getElementById('restaurant-name').value); */

  let q = document.getElementById('restaurant-name').value

  e.preventDefault()
  let cityElement = document.querySelector("#citySelector")
  let cityValue = cityElement.options[cityElement.selectedIndex].value
  console.log(cityValue);


  const query = e.target.querySelector('#restaurant-name').value;
  if (query === '') {

    /* Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, introduza termos a pesquisar!',

    }) */

    return;
  } else {
    e.target.querySelector('#restaurant-name').value = '';
    const data = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityValue}&entity_type=city&q=${q}`
      , {

        headers: {
          "user-key": "25871f706a349fe803fdb06e891f1069",
        },
        method: 'GET', /* body: `q=${query}` */
      })

    const json = await data.json()
    console.log(json);

    //contagem de resultados encontrados

    console.log(json.results_found);

    /*   document.getElementsByClassName("resultCount").innerHTML += `
      <p>Total de resultados: ${json.results_found}</p>
      
      ` */


    for (let i = 0; i < json.restaurants.length; i++) {
      const element = json.restaurants[i];
      /* console.log(element.restaurant.name); */



      //Resultados por Pesquisa
      document.getElementById("output").innerHTML += `
    
             <h2>${element.restaurant.name}</h2>
            <p>Morada: ${element.restaurant.location.address} </p>
            <p>Horários de Funcionamento: <b>${element.restaurant.timings}</b> </p>
            <p>Especialidades: ${element.restaurant.cuisines} </p>
            <p>Contacto: <span><b><a href="tel:${element.restaurant.phone_numbers}"> ${element.restaurant.phone_numbers}</a></b> </span></p>

            <img src="${element.restaurant.featured_image}" width=30%>
   
            <hr>
            `
    }
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
document.getElementById("return").onclick=function(){
  location.href="../../index.html"
}