//Constructores

function Seguro ( marca, year , tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

function UI (){

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

};

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje =  (mensaje, tipo) =>{
    const div = document.createElement("div");

    if (tipo === "error"){
        div.classList.add("bg-red-500", "p-2", "text-center", "rounded");
    }else{
        div.classList.add("bg-green-500", "p-2", "text-center", "rounded");
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

    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    console.log(seguro);
}
