## Setup

Es necesario tener instalado composer
https://getcomposer.org/download/


1. Clonar el repositorio.
2. Dentro del proyecto, hay que instalar las dependencias
-> composer install
3. npm install
4. npm run dev
5. Es necesario primero crear la DB, y setear los valores en el archivo .env, ver ejemplo .env-example
6. Corremos los seeders, esto nos creara las tablas y datos dummies 
-> php artisan migrate:refresh --seed

7. php artisan passport:install
