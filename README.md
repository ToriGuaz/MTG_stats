MTG STATS
MTG Stats
MTG Stats es una aplicación en línea para gestionar y llevar el control de las estadísticas de vida y otras métricas de jugadores en el juego de cartas Magic: The Gathering. Los usuarios pueden ver y ajustar los valores de vida de los jugadores, tanto del usuario como de los oponentes, en tiempo real, sin necesidad de instalar nada.

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
Componentes interactivos: Cada jugador tiene su propio componente (Usuario y Oponente) donde se pueden ajustar los puntos de vida.
Sincronización en tiempo real: Las estadísticas se actualizan en tiempo real usando Firebase, para una experiencia fluida entre jugadores.
Enrutamiento: Navegación fluida entre las páginas de la aplicación mediante react-router-dom.
Acceso
La aplicación está publicada y disponible en línea. Puedes acceder a ella en el siguiente enlace:

MTG Stats - Aplicación en línea

Reemplaza URL_DE_LA_APP con el enlace a tu aplicación.

Uso
Accede a la página de bienvenida (Landing Page) para comenzar.
Selecciona o ingresa en una partida.
Utiliza los botones para ajustar los puntos de vida de cada jugador en tiempo real.
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

si lo queres ver en tu pc antes de deployarlo solo escribir:
npm start

Seguridad:
instale dompurify para proteger la seguridad de la informacion que se ingresa
edite los imputs para que regulen los simbolos que si se pueden poner y el largo del imput

