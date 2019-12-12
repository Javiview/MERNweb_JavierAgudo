// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect(process.env.DB_URL_LOCAL + process.env.DB_NAME, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    name: "Alicia",
    surname: "Agudo",
    email: "aliciaagudo@gmail.com",
    password: bcrypt.hashSync("alicia", bcrypt.genSaltSync(bcryptSalt)),
    picture:
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575995588/userAvatar/perfil_chica_02_ol2qjl.jpg"
  },
  {
    name: "Amancio",
    surname: "Larena",
    email: "amanciolarena@gmail.com",
    password: bcrypt.hashSync("amancio", bcrypt.genSaltSync(bcryptSalt)),
    picture: "https://res.cloudinary.com/dexfqvxax/image/upload/v1575974004/userAvatar/perfil_chico_01.jpg"
  },
  {
    name: "Sofia",
    surname: "hebsbur",
    email: "sofiasunday@gmail.com",
    password: bcrypt.hashSync("sofia", bcrypt.genSaltSync(bcryptSalt)),
    picture: "https://res.cloudinary.com/dexfqvxax/image/upload/v1575995587/userAvatar/perfil_chica_01_eizf8h.jpg"
  },
  {
    name: "Hulio",
    surname: "Doe",
    email: "nosenadahulio@gmail.com",
    password: bcrypt.hashSync("hulio", bcrypt.genSaltSync(bcryptSalt)),
    picture: "https://res.cloudinary.com/dexfqvxax/image/upload/v1575995586/userAvatar/perfil_chico_02_hb9mix.jpg"
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
