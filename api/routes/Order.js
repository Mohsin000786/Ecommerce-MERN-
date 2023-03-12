const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require('../middlewares/verifyToken');
const Order = require('../models/Order');
const router = require('express').Router();
const stripe = require('stripe')('sk_test_51MVbLkSIln4zOh15PSliQ6G8PBOdfB4z6EtnYddcYXo1bgAh0msuUQK92ynf7JhQq9SgM8ok43wUMwCwojdtfkNf00cNmthnnt');

//CREATE

router.post("/", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session)
  const newOrder = new Order();
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // if(session){
  //   res.status(200).json(session);
  // }
  // else{
  //   res.status(500).json("ERROR")
  // }

  
  //UPDATE
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER ORDERS
  router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL
  
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;