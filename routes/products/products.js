const aws = require('aws-sdk')
const express = require('express')
let router = express.Router()

let productsController = require('../../controllers/products')

router.post('/', productsController.add)
router.get('/', productsController.getAll)
router.get('/getdiscount', productsController.getDiscount)
router.put('/', productsController.updateStock)
router.delete('/:productId', productsController.delete)
router.get('/:productId', productsController.getSingle)

module.exports = router
