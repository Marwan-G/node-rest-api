const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product')

router.get('/hiall', (request, response, next) => {
  // const product = Product.find().exec() here it returns Promise that I need to handel with .then()
  // const products = await Product.find();
  response.status(200).json({
    message: "here is all products",
  })
});
//####### diff way
// router.get('/:id', async (req, res, next) => {
//  const id = req.params.id
//  const myproduct = await Product.findById(id);
//  res.status(200).json({
//   product: myproduct.name
//  })
// })
//########
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const product = Product.findById(id)
    .exec()
    .then((resolved) => {
      if (resolved) {
        res.status(200).json({
          return: resolved
        })
      } else { res.status(400).json({ message: "No Valid Entry" }) }

    })
    .catch((err) => {
      res.status(500).json({
        message: err
      })
    })
})

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then((resolve) => {
      res.status(200).json({
        message: "this is a response form handler post /products",
        productCreated: product
      });

    })
    .catch(err => console.log(err));



  // res.status(200).json({
  //  message: "this is a response form handler post /products",
  //  productCreated: product
  // });
});



router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  if (productId == 88) {
    res.status(200).json({
      message: "you passed the correct ID",
      productId: productId
    })
  } else {
    res.status(200).json({
      message: "you did not pass the Id"
    })
  }
});
// router.delete('/:productId', async (req, res, next) => {
//  const id = req.params.productId;
//  const deletedDoc = await Product.findByIdAndDelete(id)
//  res.status(200).json({ message: deletedDoc })
// })

module.exports = router;