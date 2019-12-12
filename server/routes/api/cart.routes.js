const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");

//OTHERCRUD!!
//create
router.post("/new", (req, res, next) => {
  let { shopItems, dateStart, dateFinish, days, totalPrice, open } = req.body;
  const newCart = new Cart({
    shopItems,
    dateStart,
    dateFinish,
    days,
    totalPrice,
    open,//duda
  });
  newCart
    .save()
    .then(cart => {
      res.status(200).json(cart);
    })
    .catch(error => {
      res.status(500).json({ message: "Error saving new Cart" });
    });
});

//Read
router.get("/", (req, res, next) => {
  Cart.find()
    .then(cart => {
      res.status(200).json(cart);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Cart.findById(id)
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(error => res.status(500).json({ message: 'Cart not found'}))
  })

//update
router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    Cart.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({ message: `Cart ${id} updated` })
    })
    .catch(error => {
      res.status(500).json({ message:'Something went wrong' })
    })
  })

//delete
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Cart.findByIdAndDelete(id)
    .then(() => res.status(200).json({message: `Cart ${id} deleted`}))
    .catch(error => res.status(500).json({ message: 'Something went wrong'}))
  })

  module.exports = router;