
class Personaje {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    obtenerNombre() {
        return this.name;
    }

    obtenerFoto() {
        return this.image;
    }
}

let personajes = [];
let elemento = document.getElementById("personajes-wrapper");

const inputBuscador = document.getElementById("buscador")
inputBuscador.addEventListener("keyup", llamarBusqueda)

// funcion para crear caracteristucas de los personajes//
function buildCharacterCard(nombre, foto) {
    console.log(nombre,foto)
    return `
        <div class= "column">
        <div class="card">
        <h3 class = "tpersonaje"> ${nombre}</h3>
        <p>
        <img src = "${foto}" height= "300" width = "250" />
        <p>
        </div>
        </div>
        `
}

// Funcion para hacer la petición // 
async function getPersonajes() {
    let url = "https://akabab.github.io/starwars-api/api/all.json";

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    // funcion para iterar la funcion//
    data.forEach(datum => {
        let nuevoPersonaje = new Personaje(datum.name, datum.image)
        personajes.push(nuevoPersonaje);
    });
    console.log(personajes)


    personajes.forEach((personaje) => {
        elemento.innerHTML += buildCharacterCard(
            personaje.obtenerNombre(),
            personaje.obtenerFoto()
        )
    })
}

 // insertamos 2 divs uno de columna y otro de tarjeta //    
//  personajes.map((personaje) => {
//     elemento.innerHTML += `
//     <div class = "column">
//     <div class = "card" >
//     <h3 class = "tpersonaje"> ${personaje.obtenerNombre()}<h3>
//     <p>
//     <img src="${personaje.obtenerFoto()}" height = "300" widht = "250" />
//     <p>
//     </div>
//     `
// })


// funcion para reiniciar data //
function reiniciarData() {
    personajes.length = 0;
    elemento.innerHTML = null;
    getPersonajes();
}

// funcion para mandar llamar la busqueda //   
function llamarBusqueda() {
    setTimeout(() => {
        // const consulta = document.getElementById ("buscador").value;
        const consulta = inputBuscador.value;
        const personajesFiltrados = personajes.filter(personaje => personaje.name.toLowerCase().includes(consulta.toLocaleLowerCase()))

        if (personajesFiltrados.length > 0) {
            elemento.innerHTML = null
            personajesFiltrados.forEach((personajeFiltrado) => {
                elemento.innerHTML += buildCharacterCard(
                    personajeFiltrado.obtenerFoto(),
                    personajeFiltrado.obtenerFoto()
                )
            })
        }
    }, 500);
}

// funcion para odernar personajes //
function ordenarPersonajes() {
    const selector = document.getElementById("sort").value

    if (selector === "none") {
        reiniciarData();
        return null
    }

    const personajesOrdenados = personajes.sort((a, b) => {
        let personajeA = a.name.toLowerCase()
        let personajeB = b.name.toLowerCase()

        if (selector === 'menor') {
            if (personajeA < personajeB) {
                return -1
            }
        } else if (selector === 'mayor') {
            if (personajeA > personajeB) {
                return -1
            }
        } else {
            return 0;
        }
    })

    if (personajesOrdenados.lenght > 0) {
        elemento.innerHTML = null
        personajesOrdenados.forEach((personajesOrdenados) => {
            elemento.innerHTML += buildCharacterCard(
                personajesOrdenados.obtenerNombre(),
                personajesOrdenados.obtenerFoto()
            )
        })
    }
}

getPersonajes();