const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')
const { param } = require('../routes/api')

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAS53ZYVGGOEAXMIHO',
  secretAccessKey: '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',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
})

let docClient = new AWS.DynamoDB.DocumentClient()
var table = 'Products'

exports.add = async (params) => {
  if (params.isDiscount === 'true') {
    params.isDiscount = true
  }
  const items = {
    TableName: table,
    Item: {
      productId: uuidv4(),
      stock: params.stock,
      productName: params.productName,
      isDiscount: params.isDiscount,
      category: params.category,
    },
  }
  try {
    await docClient.put(items).promise()
    return {
      status: true,
      message: 'Product Added',
    }
  } catch (err) {
    return {
      status: false,
      message: err,
    }
  }
}

exports.getAll = async () => {
  const items = {
    TableName: table,
  }

  try {
    const data = await docClient.scan(items).promise()
    return {
      status: true,
      data: data,
    }
  } catch (err) {
    return {
      status: false,
      message: err,
    }
  }
}

exports.getSingle = async (params) => {
  var items = {
    TableName: table,
    Key: {
      productId: params.productId,
    },
  }
  try {
    const data = await docClient.get(items).promise()
    return {
      status: true,
      data: data,
    }
  } catch (err) {
    return {
      status: false,
      message: err,
    }
  }
}

exports.updateStock = async (params) => {
  var items = {
    TableName: table,
    Key: {
      productId: params.productId,
    },
    UpdateExpression: 'set stock = :stock',
    ExpressionAttributeValues: {
      ':stock': params.stock,
    },
    ReturnValues: 'UPDATED_NEW',
  }
  try {
    const data = await docClient.update(items).promise()
    return {
      status: true,
      data: data,
      message: 'Stocks Changed',
    }
  } catch (err) {
    return {
      status: false,
      message: err,
    }
  }
}

exports.getDiscount = async (params) => {
  try {
    const items = {
      TableName: table,
      Key: {},
      FilterExpression: 'isDiscount = :isDiscount',

      ExpressionAttributeValues: {
        ':isDiscount': true,
      },
    }
    const data = await docClient.scan(items).promise()
    console.log(data)
    return {
      data: data,
    }
  } catch (err) {
    console.log(err)
  }
}

exports.delete = async (params) => {
  var deletedItem = params.productId

  var items = {
    TableName: table,
    Key: {
      productId: deletedItem,
    },
    ConditionExpression: 'isDiscount = :isDiscount',
    ExpressionAttributeValues: {
      ':isDiscount': false,
    },
  }
  try {
    await docClient.delete(items).promise()
    return {
      status: true,
      message: 'product deleted',
    }
  } catch (err) {
    return {
      status: false,
      message: 'discounted products cannot be deleted',
    }
  }
}
