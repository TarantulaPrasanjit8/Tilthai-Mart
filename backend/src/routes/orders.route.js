const express = require('express');
const { newOrderControllers, getAllOrdersControllers, statusUpdateOrdersControllers, cancelOrdersControllers, updateOrdersControllers, getOrdersByUserIdController } = require('../controllers/orders.controller');
const verifyLoginToken = require('../middlewares/usersAccess.validation.middleware');
const verifyAdminLoginToken = require('../middlewares/adminUserAccess.validation.middleware');

const router = express.Router();


/**
 * 1. create order by customer
 * 2. get all orders in admin order dashboard
 * 3. accepting orders by admin
 * 4. cancelling orders by customer or admin
 * 5. updating order details by customer
 */

// create orders routes
router.post('/user/create-order',verifyLoginToken, newOrderControllers);

// get my order route
router.get('/user/my-orders', verifyLoginToken, getOrdersByUserIdController)

// get all orders routes
router.get('/get-all-orders', verifyAdminLoginToken ,getAllOrdersControllers);

// accepting orders by admin
router.put('/accept-order/:id', verifyAdminLoginToken, statusUpdateOrdersControllers);

// cancelling orders
// router.put('cancel-order', cancelOrdersControllers);

// updating orders by customer
// router.put('update-order', updateOrdersControllers);

module.exports = router
