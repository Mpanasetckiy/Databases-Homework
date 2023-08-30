const express = require("express");

const router = express.Router();
const db = require("./db");

const {
  getAllCustomers,
  getCustomerById,
  addCustomer,
} = require("./controllers/customers-controllers");

const {
  getAllProducts,
  addProduct,
  addProductAvailability,
} = require("./controllers/products-controllers");

const {
  addOrderByCustId,
  deleteOrder,
} = require("./controllers/orders-controllers");

router.get("/customers", getAllCustomers);

router.get("/customers/:cid", getCustomerById);

router.post("/customers", addCustomer);

router.get("/suppliers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM suppliers");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/products", getAllProducts);

router.post("/products", addProduct);

router.post("/products/:cid/orders", addOrderByCustId);

router.delete("/orders/:oid", deleteOrder);

router.post("/availability", addProductAvailability);

module.exports = router;
