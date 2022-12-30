const express = require("express");
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const { ObjectId } = require("mongodb");

// ssl commerz intregation by ankan
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false //true for live, false for sandbox


router.post("/", async (req, res) => {
  console.log(req.body)
  const orderInfo = req.body;
  // ssl commerz init
  const tranId = new ObjectId().toString()
  const data = {
    total_amount: orderInfo.price,
    currency: 'BDT',
    tran_id: tranId, // use unique tran_id for each api call
    success_url: `${process.env.SERVER_URL}/payment/success?transactionId=${tranId}`,
    fail_url: `${process.env.SERVER_URL}/payment/failed?transactionId=${tranId}`,
    cancel_url: `http://localhost:5000/payment/cancel?transactionId=${tranId}`,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: orderInfo.name,
    cus_email: orderInfo.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: orderInfo.postcode,
    cus_country: 'Bangladesh',
    cus_phone: orderInfo.phone,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: orderInfo.address,
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    console.log(apiResponse)
    let GatewayPageURL = apiResponse.GatewayPageURL
    res.send({ url: GatewayPageURL })
  });

  router.post('/success', async (req, res) => {
    const { transactionId } = req.query;
    res.redirect(`${process.env.CLIENT_URL}/payment/success?transactionId=${transactionId}`)
  })

  router.post('/failed', async (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/payment/failed`)
  })
})
module.exports = router;


