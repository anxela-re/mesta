# mesta
El repositorio del proyecto se encuentra alojado en la siguiente dirección https://github.com/anxela-re/mesta. Dentro del repositorio nos encontramos con dos carpetas frontend y backend, donde se aloja cada una de las partes del proyecto a la que hacen referencia con su nombre. Las instrucciones de instalación para cada una de ellas se explican a continuación y se encuentran dentro del proyecto en el archivo README ubicado en la raíz de cada una de estas carpetas.

## Obtener el repositorio 
Para obtener este repositorio ejecute
´´´bash
git clone https://github.com/anxela-re/mesta.git
´´´
## Backend 

Iniciar servidor Apache y MySQL
Si es la primera vez que abres la aplicación generar el archivo .env con el nombre de la instancia de la base de datos que se va a utilizar.

```bash
npm install
composer install
```
Una vez tenemos levantado el servidor. La primera vez que levantamos el servidor del proyecto se va a necesitar ejecutar el comando

```bash
php artisan Passport:keys
```
Este comando genera las llaves de encriptación que la librería Passport necesita para generar los access tokens de los usuarios. A continuación se realizan las migraciones necesarias para la aplicación, ejecutando:

```bash
php artisan migrate
```
Para terminar, se arranca el servidor local ejecutando:

```bash
php artisan serve
```

## Frontend
Tras la clonación del proyecto se accede al directorio de “frontend”. Para realizar la instalación del proyecto se ejecuta:

```bash
npm install
```

Una vez terminado de instalar todas las dependencias del front-end, levantamos el front-end ejecutando:

```bash
npm start
```

Una vez haya finalizado la ejecución se abrirá automáticamente una ventana con la aplicación. En caso de no ser así, si todo ha ido bien, la aplicación debería estar levantada en la dirección https://localhost:4200 