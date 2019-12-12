const express = require("express");
const router = express.Router();
const Hangers = require("../../models/Hanger");

//CRUD!!
//create
router.post("/new", (req, res, next) => {
  let { name, type, subType, colors, size, times, price, images } = req.body;
  const newHanger = new Hangers({
    name,
    type,
    subType,
    colors,
    size,
    times,
    price,
    images
  });
  newHanger
    .save()
    .then(hanger => {
      res.status(200).json(hanger);
    })
    .catch(error => {
      res.status(500).json({ message: "Error saving new Hanger" });
    });
});

//Read
router.get("/", (req, res, next) => {
  Hangers.find()
    .then(hangers => {
      res.status(200).json(hangers);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Hangers.findById(id)
    .then(hanger => {
      res.status(200).json(hanger)
    })
    .catch(error => res.status(500).json({ message: 'Hanger not found'}))
  })

//update
router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    Hangers.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({ message: `Hanger ${id} updated` })
    })
    .catch(error => {
      res.status(500).json({ message:'Something went wrong' })
    })
  })

//delete
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Hangers.findByIdAndDelete(id)
    .then(() => res.status(200).json({message: `Hanger ${id} deleted`}))
    .catch(error => res.status(500).json({ message: 'Something went wrong'}))
  })

  module.exports = router;