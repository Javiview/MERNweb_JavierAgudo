require("dotenv").config();
const mongoose = require("mongoose");
const Hanger = require("../models/Hanger");

mongoose
  .connect(process.env.DB_URL_ATLAS, {
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

let hangers = [
  {
    name: "Tacones altos negros Louboutin",
    type: "Tacon",
    subType: ["Alto"],
    colors: ["Negro"],
    size: ["36", "37"],
    times: "Atemporal",
    price: 70,
    state: true,
    images: [
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999714/hangersImages/Zapatos_LBTN_d5nawt.jpg",
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999714/hangersImages/zapatos_LBTN03_vqkw1o.jpg",
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999716/hangersImages/zapatos_LBTN02_gb1yfs.jpg"
    ]
  },
  {
    name: "Capa de Hombre Peluda",
    type: "Capa",
    subType: ["Pelo"],
    colors: ["Marron", "Negra"],
    size: ["Unica"],
    times: "Medieval",
    price: 20,
    state: true,
    images: [
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999715/hangersImages/capa_winter_f0athi.jpg"
    ]
  },
  {
    name: "Collar Edelweiss Eterna Eesmeralda y Diamantes",
    type: "Collar",
    subType: ["Esmeralda", "Diamantes", "Oro blanco"],
    colors: ["plata", "verde", "blanco"],
    size: ["42cm"],
    times: "Atemporal",
    price: 15,
    state: false,
    images: [
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999714/hangersImages/Collar_diamantes_v9wt6q.jpg",
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999714/hangersImages/collar_diamantes02_demusm.jpg"
    ]
  },
  {
    name: "Vestido Mini Tul Volantes",
    type: "Vestido",
    subType: ["Mini", "Volantes"],
    colors: ["Negro"],
    size: ["S", "M"],
    times: "Contemporanea",
    price: 17,
    state: true,
    images: [
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999716/hangersImages/vestido_zara01_lk9y2n.jpg",
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999717/hangersImages/vestido_zara02_hhaeln.jpg",
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999717/hangersImages/vestido_zara03_g2stvo.jpg"
    ]
  },
  {
    name: "Americana de hombre de pata de gallo color verde",
    type: "Americana",
    subType: ["Caza"],
    colors: ["Verde Oscuro"],
    size: ["48"],
    times: "Atemporal",
    price: 25,
    state: false,
    images: [
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999714/hangersImages/americana01_jszsvl.jpg",
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999722/hangersImages/americana02_nmauh1.jpg",
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999716/hangersImages/americana03_ncqk7r.jpg"
    ]
  },
  {
    name: "Replica armadura romana",
    type: "Armadura",
    subType: ["Romana"],
    colors: ["Acero"],
    size: ["Unica"],
    times: "Romana",
    price: 45,
    state: true,
    images: [
      "https://res.cloudinary.com/dexfqvxax/image/upload/v1575999714/hangersImages/cota_romana_apvcfv.jpg"
    ]
  }
];

Hanger.deleteMany()
  .then(() => {
    return Hanger.create(hangers);
  })
  .then(hangersCreated => {
    console.log(
      `${hangersCreated.length} hangers created with the following id:`
    );
    console.log(hangersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
