//


document.addEventListener('DOMContentLoaded', () => {



    const formulario = document.querySelector('#formulario');
    const campoMatricula = document.querySelector('#matricula');
    const listaErrores = document.querySelector('#listaErrores');
    const tablaResultados = document.querySelector("#tbody")
    const regExpMatricula = /[0-9]{4}-{1}[A-Z]{3}/;
    listaErrores.innerHTML = errores;




    const arrayPropietariosRegistrados = [
        { id: "a-1", nombre: "Ana", matricula: "4672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-2", nombre: "Juan", matricula: "4123-HKK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-3", nombre: "Lydia", matricula: "8672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-4", nombre: "Sergio", matricula: "4672-PTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-5", nombre: "Héctor", matricula: "4672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-6", nombre: "María", matricula: "4672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-7", nombre: "Roberto", matricula: "4672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-8", nombre: "Antonio", matricula: "4672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-9", nombre: "Luigi", matricula: "4672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
        { id: "a-10", nombre: "Marchelo", matricula: "4672-HTK", modelo: "", multas: "", direccion: "", telefono: "" },
    ]


    let arrayLocalPropietarios = JSON.parse(localStorage.getItem('propietarioslocal')) || [];


    formulario.addEventListener('submit', (ev) => {
        ev.preventDefault()
        validarMatricula();
    });

    const validarMatricula = () => {
        let matricula = campoMatricula.value;

        if (regExpMatricula.test(matricula))
        getMatricula()
                .then()
                .then((resp)=> {matriculaEncontrada=resp;return getNombre()})              // y hay que poner aun todos los demás datos
                .then((matriculaEncontrada)=>{})
                .catch((errores)=>{pintarErrores()})
    
        else errores += '<li>Debe introducir una matrícula correcta</li>' 
        pintarErrores()
    }


    const getMatricula = (matricula) => {

        let matriculaEncontrada = arrayPropietariosRegistrados.find((item) => item.matricula == matricula)?.matricula 
       
        const promise=new Promise((resolve,reject)=>{
            if (matriculaEncontrada) {
                resolve(matriculaEncontrada)
            } else {
                reject(errores += `La matrícula no se ha encontrado`)
            }
        })
    
         return promise
    
    }


    const getNombre = (matriculaEncontrada) => {
        let nombre = arrayPropietariosRegistrados.find((item) => item.nombre == nombre)?.nombre
        const promise=new Promise((resolve,reject)=>{
            if (nombre) {
                resolve(nombre)
            } else {
                reject(errores += `No se ha encontrado el nombre que pertenece a la matrícula ${matriculaEncontrada}`)
            }
        })
    
         return promise

    }

    const getModelo = (matriculaEncontrada,nombre) => {
        let modelo = arrayPropietariosRegistrados.find((item) => item.modelo == modelo)?.modelo
        const promise=new Promise((resolve,reject)=>{
            if (modelo) {
                resolve(modelo)
            } else {
                reject(errores += `${nombre} con matrícula ${matriculaEncontrada} no tiene un modelo asignado`)
            }
        })
    
         return promise

    }


    const getMultas = (matriculaEncontrada,nombre,modelo) => {
        let modelo = arrayPropietariosRegistrados.find((item) => item.multas == multas)?.multas
        const promise=new Promise((resolve,reject)=>{
            if (multas) {
                arrayLocalPropietarios.push(multas)
                setLocal()
                resolve(multas)
            } else {
                reject(errores += `${nombre} con matrícula ${matriculaEncontrada} y con el modelo ${modelo}, no tiene ninguna multa`)
            }
        })
    
         return promise

    }


    const setLocal = () => {
        localStorage.setItem('propietarioslocal', JSON.stringify(arrayLocalPropietarios))
        getLocal()
    }

    const getLocal = () => {

        return JSON.parse(localStorage.getItem('propietarioslocal')) || [];
        pintarTabla()
    }


    const pintarErrores = () => {
        listaErrores.innerHTML = ''
        let errores = '';

    }

    const pintarTabla = () => {

        arrayLocalPropietarios.forEach((id)=>{
            const elementoTabla = document.createElement("tr");
            elementoTabla.innerHTML += `<td>${id.matricula}</td><td>${id.modelo}</td><td>${id.nombre}</td><td>${id.multas}</td>`;
            tablaResultados.appendChild(elementoTabla);
        });
    }
})