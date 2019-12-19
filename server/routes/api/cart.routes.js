const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");

//OTHERCRUD!!
//create

router.post("/cambiar", (req, res, next) => {
  let { shopItems } = req.body;

  Cart.findOne({ createdBy: req.user.id, open: true }, (err, foundCart) => {
    console.log(foundCart);
    if (foundCart) {
      Cart.findByIdAndUpdate(
        foundCart._id,
        { $push: { shopItems: req.body } },
        { new: true }
      )
        .then(updatedCart => console.log("updated" + updatedCart))
        .catch(err => console.log(err));
      return;
    }
    const newCart = new Cart({
      createdBy: req.user.id,
      shopItems: req.body
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
});
router.post("/new", (req, res, next) => {
  let { shopItems, dateStart, dateFinish, days, totalPrice, open } = req.body;
  const newCart = new Cart({
    shopItems,
    dateStart,
    dateFinish,
    days,
    totalPrice,
    open
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
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Cart.findById(id)
    .then(cart => {
      res.status(200).json(cart);
    })
    .catch(error => res.status(500).json({ message: "Cart not found" }));
});

router.get("/userCart/:userId", (req, res, next) => {
  req.params.userId = req.user.id;
  Cart.find({ createdBy: req.params.userId })
    .populate("shopItems")
    .then(foundCart => {
      foundCart = foundCart.filter(cart => {
        return cart.open;
      });
      if (foundCart.length != 0) {
        res.status(200).json(foundCart[0]);
      } else {
        res.status(200).json({ shopItems: null });
      }
    })
    .catch(error => res.status(500).json({ message: "Cart not found" }));
});

//update
router.put("/:id", (req, res, next) => {
  Cart.findOne({ shopItems: req.params.id, open: true }, (err, foundCart) => {
    if (foundCart) {
      Cart.findByIdAndUpdate(
        foundCart._id,
        { $pull: { shopItems: req.params.id } },
        { new: true }
      )
        .populate("shopItems")
        .then(updatedCart => res.status(200).json(updatedCart))
        .catch(err => console.log(err));
    }
  });
});
router.put("/update/:id", (req, res, next) => {
  const { id } = req.params;
  req.body.shopItems = req.body.hangers;
  console.log(req.body);
  Cart.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({ message: `Cart ${id} updated` });
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

//delete
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Cart.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Cart ${id} deleted` }))
    .catch(error => res.status(500).json({ message: "Something went wrong" }));
});

module.exports = router;
