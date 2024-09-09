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
        console.log("No pasó la validación");
    }else{
        console.log("Si pasó la validación");
    };
};
   

