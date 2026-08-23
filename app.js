const portada = document.getElementById('portada');
const sobre = document.getElementById('abrirInvitacion');
const botonTexto = document.getElementById('abrirInvitacionTexto');
let abriendo = false;

function abrirInvitacion() {
  if (abriendo) return;
  abriendo = true;

  // 1) Se rompe visualmente el sello y la solapa gira hacia atrás.
  // 2) Luego la tarjeta sale desde el bolsillo del sobre.
  sobre.classList.add('abriendo');

  // 3) Dejamos la tarjeta visible un instante antes de entrar a la invitación.
  setTimeout(() => {
    portada.classList.add('saliendo');
  }, 2050);

  // 4) Se retira la portada y queda la invitación completa, sin recargar la página.
  setTimeout(() => {
    portada.classList.add('oculta');
    document.body.classList.remove('sin-scroll');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, 2820);
}

sobre.addEventListener('click', abrirInvitacion);
botonTexto.addEventListener('click', abrirInvitacion);

// Contador: 23 de abril de 2027, 00:00 en Chile continental.
// Para abril de 2027 Chile continental usa UTC-4 según la regla horaria vigente prevista.
const fechaBoda = new Date('2027-04-23T00:00:00-04:00').getTime();

const diasEl = document.getElementById('dias');
const horasEl = document.getElementById('horas');
const minutosEl = document.getElementById('minutos');
const segundosEl = document.getElementById('segundos');
const contadorEl = document.getElementById('contador');
const granDiaEl = document.getElementById('granDia');

function actualizarContador() {
  const diferencia = fechaBoda - Date.now();

  if (diferencia <= 0) {
    contadorEl.hidden = true;
    granDiaEl.hidden = false;
    return;
  }

  const dia = 1000 * 60 * 60 * 24;
  const hora = 1000 * 60 * 60;
  const minuto = 1000 * 60;

  const dias = Math.floor(diferencia / dia);
  const horas = Math.floor((diferencia % dia) / hora);
  const minutos = Math.floor((diferencia % hora) / minuto);
  const segundos = Math.floor((diferencia % minuto) / 1000);

  diasEl.textContent = String(dias).padStart(3, '0');
  horasEl.textContent = String(horas).padStart(2, '0');
  minutosEl.textContent = String(minutos).padStart(2, '0');
  segundosEl.textContent = String(segundos).padStart(2, '0');
}

actualizarContador();
setInterval(actualizarContador, 1000);

// Aparición suave de las secciones mientras se hace scroll.
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) entrada.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.revelar').forEach((elemento) => observador.observe(elemento));
