MTG STATS
MTG Stats
MTG Stats es una aplicación en línea para gestionar y llevar el control de las estadísticas de lifeCount y otras métricas de players en el juego de cartas Magic: The Gathering. Los usuarios pueden ver y ajustar los valores de lifeCount de los players, tanto del usuario como de los oponentes, en tiempo real, sin necesidad de instalar nada.

Tabla de Contenidos
Características
Acceso
Uso
Estructura del Proyecto
Tecnologías Usadas
Contribución
Licencia
Características
Landing Page: Una página de bienvenida que guía al usuario antes de iniciar el seguimiento de las estadísticas.
Componentes interactivos: Cada jugador tiene su propio componente (Usuario y Oponente) donde se pueden ajustar los puntos de lifeCount.
Sincronización en tiempo real: Las estadísticas se actualizan en tiempo real usando Firebase, para una experiencia fluida entre players.
Enrutamiento: Navegación fluida entre las páginas de la aplicación mediante react-router-dom.
Acceso
La aplicación está publicada y disponible en línea. Puedes acceder a ella en el siguiente enlace:

MTG Stats - Aplicación en línea

Reemplaza URL_DE_LA_APP con el enlace a tu aplicación.

Uso
Accede a la página de bienvenida (Landing Page) para comenzar.
Selecciona o ingresa en una partida.
Utiliza los botones para ajustar los puntos de lifeCount de cada jugador en tiempo real.
Visualiza las estadísticas en tiempo real, tanto las propias como las de los oponentes.
Estructura del Proyecto
plaintext
Copy code
mtg_stats/
├── src/
│   ├── components/
│   │   ├── LandingPage.js
│   │   ├── Usuario.js
│   │   └── Oponente.js
│   ├── App.js
│   ├── firebaseConfig.js
│   └── index.js
├── public/
├── package.json
└── README.md
components/: Contiene los componentes principales de la aplicación.
firebaseConfig.js: Archivo de configuración para Firebase.
App.js: Punto de entrada principal donde se configuran las rutas y se orquesta la aplicación.
Tecnologías Usadas
React: Librería de JavaScript para la creación de interfaces de usuario.
Firebase: Base de datos en tiempo real para almacenar y sincronizar las estadísticas de juego.
React Router: Para el enrutamiento de páginas dentro de la aplicación.
CSS: Para la personalización visual de los componentes y la interfaz.
Contribución
Las contribuciones son bienvenidas. Para contribuir:

Haz un fork del proyecto.
Crea una rama para tu función o mejora (git checkout -b feature/nueva-funcionalidad).
Realiza los cambios necesarios y haz un commit (git commit -m 'Agrega nueva funcionalidad').
Haz un push a la rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request en el repositorio principal.
Licencia
Este proyecto está bajo la Licencia MIT.
----------------------------------------------------------------------------------------

para deployar, una vez pushado escribir comando: 
npm run build
npm run deploy

para crear un componente con snnipets:  rfce

si lo queres ver en tu pc antes de deployarlo solo escribir:
npm start

Seguridad:
instale dompurify para proteger la seguridad de la informacion que se ingresa
edite los imputs para que regulen los simbolos que si se pueden poner y el largo del imput

09/11/2024: _esperar a las 05 am y ver arcane 2.
_sin tele y sin cerbeza Homero pierde la cabeza.
_ahora si, proximos pasos: 
    -al seleccionar Game, introducir al player a dicho game si no estaba.
    -actualizar map en el return de app.js que no se muestran automaticamente las modificaciones en los valores de players.


10/11: 
priorizamos correxion de errores
-proxima tarea es sumarse a una partida existente - DONE
--QUE SI CAMBIAS DE PARTIDA TE SAQUE (ya hicimos el comando de agregar el id de game en localstorage)
--que si queda negativo muestre el negativo y no vuelva a 40 
-que si no pongo player, traiga el que esta vinculado al id de localstorage - DONE
-que no aparezca principal player en la lista de oponentes - 


    