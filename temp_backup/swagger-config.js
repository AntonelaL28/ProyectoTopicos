const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CHISTE',  // Corregido tittle -> title
      version: '1.0.0',
      description: 'Swagger para nuestra api'
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Chiste: {
          type: 'object',
          required: ['texto', 'autor', 'puntuacion', 'tipo'],  // Corregido require -> required
          properties: {
            texto: {
              type: 'string',
              description: 'El chiste'
            },
            autor: {
              type: 'string',
              description: 'Persona que crea el chiste'
            },
            puntuacion: {
              type: 'integer',
              description: 'El rating del chiste'
            },
            tipo: {
              type: 'string',
              description: 'El tipo de chiste: malo, dad, humor negro'
            }
          }
        }
      },
      responses: {
        400: {
          description: 'Falta API key, inclúyela en el Authorization header',
          content: { 'application/json': {} }
        },
        500: {
          description: 'Error al obtener chiste',
          content: { 'application/json': {} }
        },
        200: {
          description: 'Operación exitosa',
          content: { 'application/json': {} }
        }
      },
      securitySchemes:{
        ApiKeyAuth: {
          type: 'apikey',
          in: 'header',
          name: 'Authorization'
        }
      }
    },
    security:[{
      ApiKeyAuth: []
    }]
  },
  apis: ['./scr/index.js']
}

export default options;

