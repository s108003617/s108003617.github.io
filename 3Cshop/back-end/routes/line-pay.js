import express from 'express'
import sequelize from '#configs/db.js'
import authenticate from '#middlewares/authenticate.js'
import { createLinePayClient } from 'line-pay-merchant'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config.js'

const router = express.Router()
const { Purchase_Order } = sequelize.models

const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

router.post('/create-order', authenticate, async (req, res) => {
  const userId = req.user.id
  const orderId = uuidv4()
  const packageId = uuidv4()

  const { amount, originalAmount, products, couponId } = req.body

  const order = {
    orderId,
    currency: 'TWD',
    amount,
    packages: [
      {
        id: packageId,
        amount,
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          imageUrl: "https://via.placeholder.com/84x84",
          quantity: product.quantity,
          price: product.price
        }))
      },
    ],
    options: { display: { locale: 'zh_TW' } },
  }

  const productDetails = products.map(product => ({
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    price: product.price
  }))

  const dbOrder = {
    id: orderId,
    user_id: userId,
    amount,
    original_amount: originalAmount,
    status: 'pending',
    order_info: JSON.stringify(order),
    products: JSON.stringify(products),
    product_details: JSON.stringify(productDetails),
    coupon_id: couponId
  }

  try {
    const createdOrder = await Purchase_Order.create(dbOrder)
    console.log('Created order:', createdOrder)
    res.json({ status: 'success', data: { order: { ...createdOrder.toJSON(), orderId } } })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ status: 'error', message: 'Failed to create order', details: error.message })
  }
})

router.get('/reserve', async (req, res) => {
  try {
    if (!req.query.orderId) {
      throw new Error('order id不存在')
    }

    const orderId = req.query.orderId
    console.log(`Processing order: ${orderId}`)

    const redirectUrls = {
      confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
      cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
    }

    const orderRecord = await Purchase_Order.findByPk(orderId, { raw: true })
    if (!orderRecord) {
      throw new Error(`Order not found: ${orderId}`)
    }
    console.log('Order record:', orderRecord)

    let order
    try {
      order = JSON.parse(orderRecord.order_info)
    } catch (e) {
      throw new Error(`Invalid order_info JSON: ${e.message}`)
    }
    console.log('Parsed order:', order)

    if (!order.packages || !order.packages[0] || !order.packages[0].products) {
      throw new Error('Invalid order structure: missing packages or products')
    }

    // 計算折扣比例，確保不會得到 NaN
    const discountRatio = orderRecord.original_amount > 0 
      ? orderRecord.amount / orderRecord.original_amount 
      : 1
    console.log(`Discount ratio: ${discountRatio}`)

    // 調整每個商品的價格，確保價格不為 0、undefined 或 null
    let totalAdjustedPrice = 0
    order.packages[0].products = order.packages[0].products.map((product, index) => {
      const originalPrice = Number(product.price)
      if (isNaN(originalPrice) || originalPrice <= 0) {
        throw new Error(`Invalid price for product at index ${index}: ${product.price}`)
      }
      const adjustedPrice = Math.max(1, Math.round(originalPrice * discountRatio))
      totalAdjustedPrice += adjustedPrice * product.quantity
      console.log(`Product ${index}: Original price: ${originalPrice}, Adjusted price: ${adjustedPrice}`)
      return {
        ...product,
        price: adjustedPrice
      }
    })

    // 如果調整後的總價與訂單金額不一致，調整最後一個商品的價格
    const priceDifference = order.amount - totalAdjustedPrice
    if (priceDifference !== 0 && order.packages[0].products.length > 0) {
      const lastProduct = order.packages[0].products[order.packages[0].products.length - 1]
      lastProduct.price += Math.round(priceDifference / lastProduct.quantity)
      console.log(`Adjusted last product price to account for ${priceDifference} difference`)
    }

    // 重新計算包裹金額，確保與訂單總金額一致
    order.packages[0].amount = order.amount
    console.log(`Final order amount: ${order.amount}`)

    console.log('Prepared order for LINE Pay:', JSON.stringify(order, null, 2))

    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    console.log('LINE Pay response:', linePayResponse.body)

    const reservation = {
      ...order,
      returnCode: linePayResponse.body.returnCode,
      returnMessage: linePayResponse.body.returnMessage,
      transactionId: linePayResponse.body.info.transactionId,
      paymentAccessToken: linePayResponse.body.info.paymentAccessToken
    }

    await Purchase_Order.update(
      {
        reservation: JSON.stringify(reservation),
        transaction_id: reservation.transactionId,
      },
      {
        where: { id: orderId },
      }
    )

    res.redirect(linePayResponse.body.info.paymentUrl.web)
  } catch (e) {
    console.error('Error in /reserve:', e)
    res.status(500).json({ status: 'error', message: 'Failed to process the reservation', details: e.message, stack: e.stack })
  }
})

router.get('/confirm', async (req, res) => {
  const { transactionId } = req.query

  const dbOrder = await Purchase_Order.findOne({
    where: { transaction_id: transactionId },
    raw: true,
  })

  if (!dbOrder) {
    return res.status(404).json({ status: 'error', message: 'Order not found' })
  }

  const transaction = JSON.parse(dbOrder.reservation)
  const amount = transaction.amount

  try {
    const linePayResponse = await linePayClient.confirm.send({
      transactionId,
      body: {
        currency: 'TWD',
        amount,
      },
    })

    const status = linePayResponse.body.returnCode === '0000' ? 'paid' : 'fail'

    await Purchase_Order.update(
      {
        status,
        return_code: linePayResponse.body.returnCode,
        confirm: JSON.stringify(linePayResponse.body),
      },
      {
        where: { id: dbOrder.id },
      }
    )

    return res.json({ status: 'success', data: linePayResponse.body })
  } catch (error) {
    console.error('Confirmation error:', error)
    return res.status(500).json({ status: 'fail', message: 'Failed to confirm the transaction' })
  }
})

router.get('/check-transaction', async (req, res) => {
  const { transactionId } = req.query

  if (!transactionId) {
    return res.status(400).json({ status: 'error', message: 'Transaction ID is required' })
  }

  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId,
      params: {},
    })

    res.json(linePayResponse.body)
  } catch (e) {
    console.error('Check transaction error:', e)
    res.status(500).json({ status: 'error', message: 'Failed to check transaction status' })
  }
})

export default router