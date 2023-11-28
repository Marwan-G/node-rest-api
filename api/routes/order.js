const express = require("express")

const router = express.Router();

router.get('/', (res, req, next) => {
 res.status(200).json({
  message: "testing"
 })
});

router.post((res, req, next) => {
 order = {
  id: req.body.id,
  quantity: req.body.quantity
 };
 res.stauts(200).json({
  message: "Resposne for Post Order",
  order: order
 });
})

module.exports = router;