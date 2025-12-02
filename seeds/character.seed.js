// Archivo character.seed.js
const mongoose = require('mongoose');

// Importamos el modelo Character en este nuevo archivo.
const Character = require('../models/Character.js');

const characters = [
  {
    name: 'Ursula Corberó',
    age: 32,
    alias: 'Tokio',
  },
  {
    name: 'Pedro Alonso',
    age: 50,
    alias: 'Berlín',
  },
  {
    name: 'Álvaro Morte',
    age: 46,
    alias: 'Profesor',
  },
  {
    name: 'Alba Flores',
    age: 34,
    alias: 'Nairobi',
  },
  {
    name: 'Jaime Lorente',
    age: 29,
    alias: 'Denver',
  },
  {
    name: 'Darko Peric',
    age: 44,
    alias: 'Helsinki',
  },
];

const characterDocuments = characters.map(character => new Character(character));

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos. Como podéis ver la URI es la
// que teníamos originalmente pero especificamente detrás de la barra le indicamos 
// el nombre de nuestra nueva Base de Datos, en este caso: casa-de-papel
mongoose
  .connect('mongodb://100.67.210.79:8034/casa-de-papel', {
  })
  .then(async () => {
		// Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allCharacters = await Character.find();
		
		// Si existen personajes previamente, dropearemos la colección
    if (allCharacters.length) {
      await Character.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de los personajes, usaremos el array characterDocuments
		// para llenar nuestra base de datos con todas los personajes.
		await Character.insertMany(characterDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());