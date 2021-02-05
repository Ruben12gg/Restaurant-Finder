
//obter localizaçao do user
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    }
}

//utilizaçao da busca de restaurante com chamada da geolocalizaçao previamente obtida
function showPosition(position) {
    let lat = position.coords.latitude
    let lon = position.coords.longitude

    console.log(lat);
    console.log(lon);


    //incorporaçao de mapa com localizaçao do user
    /* 
        let latlon = lat + "," + lon;
    
        let img_url = `https://maps.googleapis.com/maps/api/staticmap?center=
            "+${latlon}+"&zoom=14&size=400x300&sensor=false&key=1`
    
        document.getElementById("mapHolder").innerHTML = "<img src='" + img_url + "'>";
     */

    const searchForm = document.querySelector('form');

    searchForm.addEventListener('submit', async e => {

        let q = document.getElementById('restaurant-name').value

        e.preventDefault()

        const query = e.target.querySelector('#restaurant-name').value;
        if (lat === '' && lon === '') {

            alert("rip")

            return;
        } else {
            e.target.querySelector('#restaurant-name').value = '';
            const data = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${q}&lat=${lat}&lon=${lon}`
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


}

getLocation();

//return home
document.getElementById("return").onclick = function () {
    location.href = "../../index.html"
}

