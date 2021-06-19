# Mercado Pago Payment Backend

### Instalación

Tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/es).

Setee variable de entorno de MongoDb archivo .env:

```sh
$ MONGODB_URL="mongodb://..."
```

Instalar las dependencias e iniciar:

```sh
$ npm install
```

En modo desarrollo

```sh
$ npm run dev
```

En modo produccion

```sh
$ npm start
```

En modo debug:

```sh
$ npm run debug
```

Testear Api Rest (por ahora registro usuario - RECOMENDADO EJECUTAR ASI SE CREA EL PRIMER USUARIO):

```sh
$ npm run dev
$ npm test
```


#### Rutas (utilizar postman)


```js
/api/users/login (POST)
/api/users/register (POST)

Se requiere pasar por header (Bearer) el token de usuario

/api/profile (GET)
/api/callback (GET)
/api/process_payment (POST)

```
#### Modelo User

```
name: String - requerido
email: String - requerido
password: String - requerido
avatar: String
date: Date
```
