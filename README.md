## Para Correr el Proyecto

### Paso 1:
Se debe crear un archivo ".env" que contenga lo siguiente:
MONGO_USERNAME=tu_usuario
MONGO_PASSWORD=tu_contraseña
MONGO_PORT=27017
MONGO_DB=nombre_de_tu_base_de_datos
MONGO_HOSTNAME=mongo 
(se debe agregar manualmente, ya que a la hora de descargarlo del github no aparece)

### Paso 2:
Para correrlo en el terminal:
docker-compose -f docker-compose.local.yml up --build



## URL para la Documentación de la API
http://localhost:3005/api-docs



## Pruebas de TDD 
Para ejecutarlas: npm test
Si no está instalado el Jest, para que si lo esté se siguen estos pasos:

### Paso 1:
Colocar en la terminal: npm install --save-dev jest

### Paso 2:
Agregar un script de prueba y la sección Jest en package.json:
Se verá así:
"scripts": {
    "start": "node scr/index.js",
    "test": "jest"
},
"jest": {
    "testEnvironment": "jsdom",
    "transform": {
        "^.+\\.jsx?$": "babel-jest"
    }
}

### Paso 3:
Instalar Babel y las dependencias:
npm install --save-dev @babel/core @babel/preset-env babel-jest jest jest-environment-jsdom
Una vez instalado, en package.json debe salir así:
"devDependencies": {
    "@babel/core": "^7.26.0",
    "@babel/preset-env": "^7.26.0",
    "babel-jest": "^29.7.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
}

### Paso 4:
Crear un archivo ".babelrc" y agregar:
{
  "presets": ["@babel/preset-env"]
}