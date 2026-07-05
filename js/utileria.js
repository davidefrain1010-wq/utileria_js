document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formularioPrincipal');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const inputTelefono = document.getElementById('telefono');
    const inputFecha = document.getElementById('fechaNacimiento');
    const inputPassword = document.getElementById('password');
    const inputMensaje = document.getElementById('mensaje');

    const errNombre = document.getElementById('errorNombre');
    const errEmail = document.getElementById('errorEmail');
    const errTelefono = document.getElementById('errorTelefono');
    const errFecha = document.getElementById('errorFecha');
    const errPassword = document.getElementById('errorPassword');
    const errMensaje = document.getElementById('errorMensaje');
    const errGeneral = document.getElementById('errorGeneral');

    const modal = document.getElementById('modalEdad');
    const edadMostrada = document.getElementById('edadMostrada');
    const modalMayorEdad = document.getElementById('modalMayorEdad');
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const btnAbrirModalDemo = document.getElementById('btnAbrirModalDemo');

function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo.trim());
}


function soloLetras(texto) {
    if (typeof texto !== 'string') return false;
    return /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(texto.trim());
}

function validarLongitud(numero, maxLongitud) {
    if (numero === undefined || numero === null) return false;
    const str = String(numero).replace(/\s/g, '');
    const digitos = str.replace(/^\+?/, '').replace(/\D/g, '');
    return digitos.length <= maxLongitud;
}

function calcularEdad(fechaNacimiento) {
    let fecha;
    if (typeof fechaNacimiento === 'string') {
        fecha = new Date(fechaNacimiento);
    } else if (fechaNacimiento instanceof Date) {
        fecha = fechaNacimiento;
    } else {
        return 0;
    }
    if (isNaN(fecha.getTime())) return 0;

    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    return edad;
}

function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad >= 18;
}

function validarPassword(password) {
    if (typeof password !== 'string') return false;
    const pwd = password.trim();
    if (pwd.length < 8) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[a-z]/.test(pwd)) return false;
    if (!/[0-9]/.test(pwd)) return false;
    if (!/[!@#$%^&*()_+\-=[\]{};:'",.<>/?\\|`~]/.test(pwd)) return false;
    return true;
}

function formatearFechaLegible(fecha) {
    let d;
    if (typeof fecha === 'string') {
        d = new Date(fecha);
    } else if (fecha instanceof Date) {
        d = fecha;
    } else {
        return '';
    }
    if (isNaN(d.getTime())) return '';
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

function capitalizarNombre(texto) {
    if (typeof texto !== 'string') return '';
    return texto.trim().replace(/\b\w/g, letra => letra.toUpperCase());
}

    const inputs = [inputNombre, inputEmail, inputTelefono, inputFecha, inputPassword, inputMensaje];
    const errores = [errNombre, errEmail, errTelefono, errFecha, errPassword, errMensaje];
    inputs.forEach((inp, i) => {
        inp.addEventListener('input', function() {
            errores[i].textContent = '';
            this.classList.remove('campo-valido', 'campo-invalido');
        });
        inp.addEventListener('blur', function() {
            if (this.id === 'nombre' && this.value.trim() !== '') {
                if (soloLetras(this.value)) {
                    this.classList.add('campo-valido');
                    this.classList.remove('campo-invalido');
                    errNombre.textContent = '';
                } else {
                    this.classList.remove('campo-valido');
                    this.classList.add('campo-invalido');
                    errNombre.textContent = 'Solo se permiten letras.';
                }
            }
            if (this.id === 'email' && this.value.trim() !== '') {
                if (validarCorreo(this.value)) {
                    this.classList.add('campo-valido');
                    this.classList.remove('campo-invalido');
                    errEmail.textContent = '';
                } else {
                    this.classList.remove('campo-valido');
                    this.classList.add('campo-invalido');
                    errEmail.textContent = 'Formato de correo inválido.';
                }
            }
            if (this.id === 'password' && this.value.trim() !== '') {
                if (validarPassword(this.value)) {
                    this.classList.add('campo-valido');
                    this.classList.remove('campo-invalido');
                    errPassword.textContent = '';
                } else {
                    this.classList.remove('campo-valido');
                    this.classList.add('campo-invalido');
                    errPassword.textContent =
                        'Mín. 8 caracteres, mayúscula, minúscula, número y especial.';
                }
            }
            if (this.id === 'telefono' && this.value.trim() !== '') {
                const limpio = this.value.replace(/\s/g, '');
                if (validarLongitud(limpio, 15)) {
                    this.classList.add('campo-valido');
                    this.classList.remove('campo-invalido');
                    errTelefono.textContent = '';
                } else {
                    this.classList.remove('campo-valido');
                    this.classList.add('campo-invalido');
                    errTelefono.textContent = 'Máximo 15 dígitos.';
                }
            }
            if (this.id === 'fechaNacimiento' && this.value !== '') {
                const edad = calcularEdad(this.value);
                if (edad > 0 && edad < 120) {
                    this.classList.add('campo-valido');
                    this.classList.remove('campo-invalido');
                    errFecha.textContent = '';
                } else {
                    this.classList.remove('campo-valido');
                    this.classList.add('campo-invalido');
                    errFecha.textContent = 'Fecha inválida o fuera de rango.';
                }
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        errNombre.textContent = '';
        errEmail.textContent = '';
        errTelefono.textContent = '';
        errFecha.textContent = '';
        errPassword.textContent = '';
        errMensaje.textContent = '';
        errGeneral.textContent = '';
        inputs.forEach(inp => inp.classList.remove('campo-valido', 'campo-invalido'));

        let valido = true;

        const nombre = inputNombre.value.trim();
        if (!nombre) {
            errNombre.textContent = 'El nombre es obligatorio.';
            inputNombre.classList.add('campo-invalido');
            valido = false;
        } else if (!soloLetras(nombre)) {
            errNombre.textContent = 'Solo se permiten letras (incluye acentos).';
            inputNombre.classList.add('campo-invalido');
            valido = false;
        } else {
            inputNombre.classList.add('campo-valido');
        }

        const email = inputEmail.value.trim();
        if (!email) {
            errEmail.textContent = 'El correo es obligatorio.';
            inputEmail.classList.add('campo-invalido');
            valido = false;
        } else if (!validarCorreo(email)) {
            errEmail.textContent = 'Formato de correo inválido.';
            inputEmail.classList.add('campo-invalido');
            valido = false;
        } else {
            inputEmail.classList.add('campo-valido');
        }
        const telefono = inputTelefono.value.trim();
        if (telefono) {
            const limpio = telefono.replace(/\s/g, '');
            if (!validarLongitud(limpio, 15)) {
                errTelefono.textContent = 'Máximo 15 dígitos.';
                inputTelefono.classList.add('campo-invalido');
                valido = false;
            } else {
                inputTelefono.classList.add('campo-valido');
            }
        } else {
            inputTelefono.classList.add('campo-valido');
        }
        
        const fecha = inputFecha.value;
        if (!fecha) {
            errFecha.textContent = 'La fecha de nacimiento es obligatoria.';
            inputFecha.classList.add('campo-invalido');
            valido = false;
        } else {
            const edad = calcularEdad(fecha);
            if (edad <= 0 || edad >= 120) {
                errFecha.textContent = 'Fecha inválida o fuera de rango.';
                inputFecha.classList.add('campo-invalido');
                valido = false;
            } else {
                inputFecha.classList.add('campo-valido');
                inputFecha.dataset.edad = edad;
                inputFecha.dataset.mayor = esMayorDeEdad(fecha) ? 'true' : 'false';
            }
        }

        const password = inputPassword.value.trim();
        if (!password) {
            errPassword.textContent = 'La contraseña es obligatoria.';
            inputPassword.classList.add('campo-invalido');
            valido = false;
        } else if (!validarPassword(password)) {
            errPassword.textContent = 'Mín. 8 caracteres, mayúscula, minúscula, número y especial.';
            inputPassword.classList.add('campo-invalido');
            valido = false;
        } else {
            inputPassword.classList.add('campo-valido');
        }

        const mensaje = inputMensaje.value.trim();
        if (!mensaje) {
            errMensaje.textContent = 'El mensaje es obligatorio.';
            inputMensaje.classList.add('campo-invalido');
            valido = false;
        } else {
            inputMensaje.classList.add('campo-valido');
        }

        if (!valido) {
            errGeneral.textContent = 'Corrige los errores marcados.';
            return;
        }
        const edad = parseInt(inputFecha.dataset.edad) || 0;
        const mayor = inputFecha.dataset.mayor === 'true';
        mostrarModal(edad, mayor);

        console.log('Formulario validado correctamente.');
        console.log('Correo:', email);
        console.log('Nombre:', capitalizarNombre(nombre));
        console.log('Fecha:', formatearFechaLegible(fecha));
        console.log('Contraseña válida:', validarPassword(password));
    });

    function mostrarModal(edad, mayor) {
        edadMostrada.textContent = edad;
        modalMayorEdad.textContent = mayor ? '¡Eres mayor de edad! :)' : 'No eres mayor de edad :(';
        modal.classList.add('activo');
    }

    function cerrarModal() {
        modal.classList.remove('activo');
    }

    btnCerrarModal.addEventListener('click', cerrarModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
    });

    btnAbrirModalDemo.addEventListener('click', function() {
        const fecha = inputFecha.value;
        if (!fecha) {
            errFecha.textContent = 'Primero ingresa tu fecha de nacimiento.';
            inputFecha.focus();
            return;
        }
        const edad = calcularEdad(fecha);
        if (edad <= 0 || edad >= 120) {
            errFecha.textContent = 'Fecha inválida o fuera de rango.';
            inputFecha.classList.add('campo-invalido');
            return;
        }
        errFecha.textContent = '';
        inputFecha.classList.add('campo-valido');
        inputFecha.dataset.edad = edad;
        inputFecha.dataset.mayor = esMayorDeEdad(fecha) ? 'true' : 'false';
        mostrarModal(edad, esMayorDeEdad(fecha));
    });
});