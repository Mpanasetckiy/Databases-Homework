const express = require("express");

const router = express.Router();
const db = require("./db");

router.get("/customers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/suppliers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM suppliers");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/products", async (req, res) => {
  const queryPattern = req.query.name;
  try {
    const result = await db.query(
      "SELECT \
       products.id, products.product_name, \
       product_availability.unit_price, \
       suppliers.supplier_name \
       FROM products \
       JOIN product_availability ON products.id=product_availability.prod_id \
        JOIN suppliers ON product_availability.supp_id=suppliers.id \
        WHERE product_name ILIKE $1",
      [`%${queryPattern}`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
