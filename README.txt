INVITACIÓN BODA — V5

CAMBIOS DE ESTA VERSIÓN
- La canción comienza cuando el invitado toca "Abrir invitación".
- Se eliminó el video de YouTube.
- Se agregó un reproductor personalizado y un botón flotante de música.
- El MP3 está incluido en assets/nuestra-cancion.mp3.
- Se dejó Eclesiastés 4:9-12 al final (Reina-Valera 1909, dominio público).

CAMBIAR HORA DE LA CEREMONIA
Busca en index.html:
00:00 hrs

CAMBIAR HORA DEL CONTADOR
Busca en app.js:
2027-04-23T00:00:00-04:00

Ejemplo para 18:30:
2027-04-23T18:30:00-04:00

IMPORTANTE
Sube a GitHub todos los archivos y carpetas manteniendo la estructura.
El archivo principal debe llamarse index.html.


NUEVAS SECCIONES V6
- Código de vestimenta: Formal / Semi formal.
- Sugerencia de regalo con texto Lorem provisional.
- Confirmación de asistencia con botón provisional.
- Álbum compartido con botón provisional.

Cuando tengas el enlace de Google Forms y el enlace del álbum, reemplazaremos los botones provisionales por enlaces reales.

V7: Vestimenta, regalo y confirmación ahora están agrupados en un solo bloque de Información importante. El álbum permanece separado.

CAMBIOS FINALES
- Versículo actualizado al texto proporcionado: Eclesiastés 4:9-12 · Reina-Valera 1960.
- Álbum configurado para usar Google Forms + Google Drive gratis.

PARA ACTIVAR EL ÁLBUM
1. Crea tu Google Forms con una pregunta "Subir archivos".
2. Copia el enlace del formulario.
3. En index.html busca:
   href="#" id="botonAlbum"
4. Reemplaza # por el enlace de tu Google Forms.
5. Opcional: elimina aria-disabled="true" y cambia el texto "enlace por agregar".
