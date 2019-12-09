require('dotenv').config();
const mongoose = require("mongoose");
const Hanger = require("../models/Hanger");

mongoose
  .connect(process.env.DB_URL_LOCAL + process.env.DB_NAME, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let hangers = [
    {
        name: "Camiseta blanca con raya azul",
        type: "Camiseta",
        colors: ["Blanco","Azul"]
    },
    {
        name: "Sueter rojo de punto",
        type: "Sueter",
        colors: ["Rojo"],
    }
  ]

  Hanger.deleteMany()
.then(() => {
  return Hanger.create(hangers)
})
.then(hangersCreated => {
  console.log(`${hangersCreated.length} users created with the following id:`);
  console.log(hangersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})