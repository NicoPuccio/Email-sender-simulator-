//variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar'); 
const formularioEnviar = document.getElementById('enviar-mail');
const btnResetear = document.getElementById('resetBtn');

//event listeners
eventListeners();

function eventListeners(){
    //inicio de la aplicacion y deshabilitar el submit
    document.addEventListener('DOMContentLoaded', inicioApp);

    //campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    //Boton de enviar en el submit
    btnEnviar.addEventListener('click', enviarEmail);
    btnResetear.addEventListener('click', resetearFormulario);
}


//functions 
function inicioApp(){
    btnEnviar.disabled = true;
}

function validarCampo(){
    // Se valida la longitud del texto yq ue no este vacio
    validarLongitud(this); //this -> el campo alctual

    //validar unicamente el email 
    if(this.type === 'email'){
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');

    if(email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
        if(errores.length === 0){
            btnEnviar.disabled = false;
        }
    }
}

function enviarEmail(e){
    //spinner al presionar enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    //gif que envia email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    //ocultar spinner y mostrar gif de enviado

    setTimeout(function(){
        spinnerGif.style.display = 'none' //se oculta despues de 3 sec

        document.querySelector('#loaders').appendChild(enviado);

        setTimeout(function (){
            enviado.remove();
            formularioEnviar.reset();
        }, 3000);
    }, 3000);

    e.preventDefault();
}



function validarLongitud(campo){
    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error'); //quita la clase error en html
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error'); //agrega una clase error en html cuando el campo esta vacio
    }
}

function validarEmail(campo){
    const mensaje = campo.value;

    if(mensaje.indexOf('@') !== -1){ //indexOf retorna -1 si no se encontro nada. 
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function resetearFormulario(e){
    formularioEnviar.reset();
    e.preventDefault();
}