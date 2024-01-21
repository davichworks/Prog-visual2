
# Programación visual

## Descripción

Entrega 2, aplicación web moderna completa con un Front en HTML5, API Rest sobre Node/Express con autenticación y autorización utilizando JWT y base de datos MongoDB.

## Estado del Proyecto

Completado

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Mockups](#mockups)
- [Pasos que se han realizado](#pasos)

## Instalación

-Descargar MongoDB en su página principal

-Ejecutar mongod

-Necesario crear base de datos "testdb" con la colección users , al ejecutar el programa se cargarán el resto

- dirección del servidor de mongo predefinida ->  'mongodb://127.0.0.1:27017/testdb',

- descargar npm install bcryptjs jsonwebtoken mongoose path cors body-parser express

## Uso

1-Registro y loggeo en mongoDB con autenticación y autorización JWT
2-Acceso a datos de mongoDB según autorización
3-Para la creación de cuentas Admin/Moderator hace falta introducir una contraseña predefinida, en este caso "patata"

## Mockups

### 1. Form de inicio con los datos públicos
   
![image](https://github.com/davichworks/Prog-visual2/assets/70800903/517d3d69-cc52-4a06-a479-b379e8617e12)

### 2. Form de registro con opción de elegir entre los roles
   
![image](https://github.com/davichworks/Prog-visual2/assets/70800903/5ea07f0f-c848-4e62-8e66-8a3e2b7c4aab)

### 3. Datos del usuario identificado como user (Libros totales bd)
   
![image](https://github.com/davichworks/Prog-visual2/assets/70800903/e3fd14a4-ff5d-4a1b-ae88-0375db85d1ef)

### 4. Datos del usuario identificado como admin ( Información usuarios registrados )
   
![image](https://github.com/davichworks/Prog-visual2/assets/70800903/c47b72d6-7a4c-4ee8-95c4-f7b71dd299b9)

### 5. Datos del usuario identificado como moderador (Información usuarios sin privilegios registrados)
   
![image](https://github.com/davichworks/Prog-visual2/assets/70800903/3a4430d8-68e0-4e02-a5ba-c0071eba002d)


## Pasos

### Cliente
1- Crear form html login con un área donde mostrar información y form registro , crear un css guapo para ambos y crear los siguientes scripts para su funcionamiento

2- Crear en js las acciones de los botones que serán tanto GETS y POST a un api rest y funciones para mostrar los datos por pantalla

### Servidor

3- Crear servidor express nodejs e iniciarlo en un puerto

4- Crear archivo config con la configuración de nuestra base de datos, y la key secret para firmar los tokens

5- Crear las rutas GET Y POST de nuestro servidor y realizar las funciones correspondientes antes enviar la respuesta

6- Crear los modelos de los datos que vamos a utilizar, ajustandolo a mongodb 

7- Crear el middleware del servidor, en este caso uno para validar el token y devolver su rol; y otro para validar el email y el rol 

8- Crear los controladores, en este caso los que vamos a utilizar para la autentificacion(login/registro) y por otro lado los controladores para aportar la información al usuario dependiendo de su rol

9- Importar todas las carpetas con sus archivos al servidor node 

10- Descargar mongodb y MongoDBCluster, conectarse a mongodb://127.0.0.1:27017 y crear base de datos denominada "testdb" con la coleccion "users"

11- Ejecutar server











