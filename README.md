## Grupo 2 - sección 16343
Daniela Castaldo (DaniCastaldo), 30906448
Antonela Lauria (AntonelaL28), 30969781 
Mariadelia Finizola (marid29), 30693341

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
Abrir la terminal e ingresar lo siguiente:
docker-compose -f docker-compose.local.yml up --build

## Paso 3:
Abrir el proyecto en el navegador con:
http://localhost:3005/

NOTA:
Si al abrir el proyecto en el navegador no funciona nada,
ingresar estas instrucciones adicionales en la terminal:

primero esta:
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
luego esta:
http-server -p 3005

Y deberá ingresar en este URL para visualizar la página de chistes:
http://localhost:3005/index.html



## URL para la Documentación de Swagger
Para visualizar la página de Swagger ingrese en:
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
