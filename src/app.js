//Constructores

function Seguro ( marca, year , tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

//Realiza la cotización de los datos
Seguro.prototype.cotizarSeguro = function (){

    /*
     *  1 = Americano 1.15
     *  2 = Asiatico 1.05
     *  3 = Europeo 1.35
    */

    let cantidad;
    const base = 20000;

    switch (this.marca) {
        case "1":
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;
        default:
            break;
    };

    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    //Reducion de 3% por año de diferencia
    cantidad -= ((diferencia * 3) *cantidad) / 100;

    /** 
     * Seguro Basico * 30%
     * Seguro completo * 50%
    */

    if (this.tipo === "basico"){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
}

function UI (){}

//Llena las opciones de los años
UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max - 10;
    
    const selectYear = document.querySelector("#year");

    for ( let i = max; i > min; i--){
        let option = document.createElement("option")
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
     };
};


//Muestra alertas en pantalla
UI.prototype.mostrarMensaje =  (mensaje, tipo) =>{
    const div = document.createElement("div");

    if (tipo === "error" ){
        div.classList.add("bg-red-500", "p-2", "text-center", "rounded", );
    }else{
        div.classList.add("bg-green-500", "p-2", "text-center", "rounded", );
    }

    div.classList.add("mensaje", "mt-4");
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(() => {
        div.remove();
    }, 3000);

} 

UI.prototype.mostrarResultado = (total, seguro) => {

    const {marca, year, tipo} = seguro;
    let textoMarca;

    switch(marca){

        case "1":
            textoMarca = "Americano"
            break;

        case "2":
            textoMarca = "Asiatico"
            break;

        case "3":
            textoMarca = "Europeo"
            break;

        default:
            break;
    };

    //Crear el resultado 
    const div = document.createElement("div");
    div.classList.add("border-2");

    div.innerHTML = `
        <p class="bg-blue-400 p-1 font-bold text-center  text-white uppercase ">Tu resumen</p>
        <p class="font-bold mt-2 text-center">Marca: <span class="font-normal "> ${textoMarca} </span></p>
        <p class="font-bold text-center">Año: <span class="font-normal "> ${year} </span></p>
        <p class="font-bold text-center">Tipo: <span class="font-normal capitalize"> ${tipo} </span></p>
        <p class="font-bold text-center mb-3">Total: <span class="font-normal" >$  ${total} </span></p>
    `;

    const resultadoDiv = document.querySelector("#resultado");
    

    //Mostrar el Spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        resultadoDiv.appendChild(div);
    }, 3000);

}


//Instanciar Interfaz de usuario
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones(); //Llena el sele
});

eventListener();
function eventListener (){
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro)

}

function cotizarSeguro (e){
    e.preventDefault();
    
    //Leer marca
    const marca = document.querySelector("#marca").value;
    
    //Leer año
    const year = document.querySelector("#year").value;

    // Leer tipo
    const tipo = document.querySelector("input[name='tipo']:checked").value;

    if (marca === "" || year === "" || tipo === ""){
        ui.mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }
    ui.mostrarMensaje("Cotizando...", "exito");

    //ocultar las cotizaciones previas
    const resultado = document.querySelector("#resultado div");
    if (resultado != null){
        resultado.remove();
    }

    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro)
}
