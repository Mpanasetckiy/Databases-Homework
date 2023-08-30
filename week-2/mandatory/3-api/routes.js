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

router.post("/availability", async (req, res) => {
  const prodId = req.body.product_id;
  const suppId = req.body.supplier_id;
  const unitPrice = req.body.unit_price;

  if (prodId < 1 || prodId > 9) {
    return res.status(400).json({ error: "Out of valid product range" });
  }
  if (suppId < 1 || suppId > 4) {
    return res.status(400).json({ error: "Out of valid supplier range" });
  }

  try {
    await db.query(
      "INSERT INTO product_availability (prod_id, supp_id, unit_price) \
    VALUES ($1, $2, $3)",
      [prodId, suppId, unitPrice]
    );

    const insertedProduct = await db.query(
      "SELECT * FROM product_availability WHERE prod_id = $1 AND supp_id = $2",
      [prodId, suppId]
    );

    console.log(`New product is = ${insertedProduct.rows[0]}`);
    res.status(200).json({ newAvailability: insertedProduct.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
