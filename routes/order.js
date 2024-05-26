const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.get('/orderForm', orderController.getOrderForm);
router.post('/submitOrder', orderController.submitOrder);

module.exports = router;
