# Código fuente del ECCBIO

## Requerimientos mínimos
- _php-mcrypt_ Se requiere esta extensión para el panel de administración. (https://gist.github.com/kevinski303/88dedbb4734d4518e03556494be84ec7)
- _texlive-full_ Se requiere este paquete de los repositorios (debian/fedora)
- _python_ Se requiere python y pyhotn para latex (https://ctan.org/tex-archive/macros/latex/contrib/python)
- Se requiere una cuenta con billing activado de GoogleCloudPlatform


## Información relevante acerca de la implementación (Archivos a modificar antes de inicializar):
- **jsvars.php** (Definir aquí las siguientes variables, este archivo es incluido en index.php, utilizar jsvars.php.example como base)
	- home: establecer aquí el nombre de la base de datos MySQL con la que se importaron los datos.
	- idPais: 1 para México (constante)
	- key: Google API Key para usar el framework de Google Maps


- **Panel/base.php** (Definir aquí los datos para la conexión a la BD utilizar Panel/base.php.example como base)

- **Panel/host.php** (Definir aquí la url donde habitará el Explorador, utilizar Panel/host.php.example como base)

- **Panel/host2.php** (Definir usario y nombde de la base de datos para que el panel haga conexión con la bas de datos)

- **Panel/app** (Ruta general del Panel de administración)

- **Panel/app/config/database.php** (Info de la base de datos usar Panel/app/config/database.php.example como base)

- **Panel/app/views/admin/login.php** (Establecer la ruta absoluta raiz del panel ej: localhost/eccbio/Panel)

- **Panel/app/config/app.php** (Establecer la ruta relativa raíz del panel ej: ../Panel/)

- **Panel/assets/js/estilos.js** (Establecer la ruta del panel en la variable "host" ej: http://localhost/eccbio/Panel/)

- **Panel/app/config/session.php** (Establecer la ruta del proyecto ej: http://localhost/eccbio/)
