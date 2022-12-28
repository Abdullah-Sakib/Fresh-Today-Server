const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const SSLCommerzPayment = require('sslcommerz-lts')
require("dotenv").config();
const port = process.env.PORT || 5000;

// ssl commerz intregation by ankan
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false //true for live, false for sandbox

const app = express();

app.use(cors());
app.use(express.json());
// mongodb database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bydhqyw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productsCollection = client
      .db("freshDb")
      .collection("productsCollections");
    const categoriesCollection = client.db("freshDb").collection("categorises");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      const query = {};
      const result = await categoriesCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payment", async (req, res) => {
      const orderInfo = req.body;
      // ssl commerz init
      const data = {
        total_amount: orderInfo.price,
        currency: 'BDT',
        tran_id: new ObjectId().toString(), // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
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
    })

    app.get("/products/:name", async(req, res) => {
      const category = req.params.name;
      const query = {category};
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    })

  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", async (req, res) => {
  res.send("the fresh today server is running");
});

app.listen(port, () => {
  console.log(`the fresh today server is running on ${port}`);
});
