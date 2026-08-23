const portada = document.getElementById('portada');
const sobre = document.getElementById('abrirInvitacion');
const botonTexto = document.getElementById('abrirInvitacionTexto');
const musica = document.getElementById('musicaBoda');
const botonMusica = document.getElementById('botonMusica');
const iconoMusica = document.getElementById('iconoMusica');
const reproductorPlay = document.getElementById('reproductorPlay');
const iconoPlay = document.getElementById('iconoPlay');
const progresoAudio = document.getElementById('progresoAudio');
const tiempoAudio = document.getElementById('tiempoAudio');

let abriendo = false;

// Volumen inicial de la canción.
// Puedes cambiar 0.55 por un número entre 0 y 1.
musica.volume = 0.55;

function actualizarEstadoMusica() {
  const pausada = musica.paused;

  if (iconoPlay) iconoPlay.textContent = pausada ? '▶' : '❚❚';
  if (iconoMusica) iconoMusica.textContent = pausada ? '♪' : '♫';
  if (botonMusica) botonMusica.classList.toggle('pausada', pausada);
}

function alternarMusica() {
  if (musica.paused) {
    musica.play().catch(() => {});
  } else {
    musica.pause();
  }
  actualizarEstadoMusica();
}

function abrirInvitacion() {
  if (abriendo) return;
  abriendo = true;

  // Como este play ocurre exactamente después del clic del invitado,
  // normalmente Chrome, Safari y los navegadores móviles permiten el audio.
  musica.currentTime = 0;
  musica.play().catch(() => {
    // Si un navegador lo bloquea igualmente, el botón flotante queda disponible.
    actualizarEstadoMusica();
  });

  // 1) El sello desaparece y la solapa gira hacia atrás.
  // 2) Luego la tarjeta sale desde el bolsillo del sobre.
  sobre.classList.add('abriendo');

  // 3) Dejamos la tarjeta visible un instante antes de entrar a la invitación.
  setTimeout(() => {
    portada.classList.add('saliendo');
  }, 2050);

  // 4) Se retira la portada y queda la invitación completa, sin recargar.
  setTimeout(() => {
    portada.classList.add('oculta');
    document.body.classList.remove('sin-scroll');
    window.scrollTo({ top: 0, behavior: 'auto' });
    actualizarEstadoMusica();
  }, 2820);
}

sobre.addEventListener('click', abrirInvitacion);
botonTexto.addEventListener('click', abrirInvitacion);

botonMusica.addEventListener('click', alternarMusica);
reproductorPlay.addEventListener('click', alternarMusica);

musica.addEventListener('play', actualizarEstadoMusica);
musica.addEventListener('pause', actualizarEstadoMusica);

function formatoTiempo(segundos) {
  if (!Number.isFinite(segundos)) return '0:00';
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${String(seg).padStart(2, '0')}`;
}

musica.addEventListener('timeupdate', () => {
  if (musica.duration) {
    const porcentaje = (musica.currentTime / musica.duration) * 100;
    progresoAudio.style.width = `${porcentaje}%`;
  }
  tiempoAudio.textContent = formatoTiempo(musica.currentTime);
});

// Permite tocar la barra para adelantar o retroceder.
document.querySelector('.barra-audio')?.addEventListener('click', (evento) => {
  if (!musica.duration) return;
  const rect = evento.currentTarget.getBoundingClientRect();
  const proporcion = Math.min(1, Math.max(0, (evento.clientX - rect.left) / rect.width));
  musica.currentTime = musica.duration * proporcion;
});

// Contador: 23 de abril de 2027, 00:00 en Chile continental.
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

actualizarEstadoMusica();
