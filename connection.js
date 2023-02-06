const { MongoClient } = require("mongodb");

const dbName = "restaurantdb";

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, {
  useUnifiedTopology: true
});

module.exports = async () => {
  // Conectamos al servidor
  await client.connect();
  console.log("connecion establecida");
  return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
};