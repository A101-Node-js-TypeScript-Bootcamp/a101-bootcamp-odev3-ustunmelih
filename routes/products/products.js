const aws = require('aws-sdk')
const express = require('express')
let router = express.Router()

let productsController = require('../../controllers/products')

//We draw the path to the API endpoints
//To send a request to a single product in the product path, we define it as ':productId'
router.post('/', productsController.add)
router.get('/', productsController.getAll)
router.get('/getdiscount', productsController.getDiscount)
router.put('/', productsController.updateStock)
router.delete('/:productId', productsController.delete)
router.get('/:productId', productsController.getSingle)

module.exports = router
