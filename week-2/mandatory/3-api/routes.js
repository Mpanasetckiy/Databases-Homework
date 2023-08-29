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

router.get("/customers/:cid", async (req, res) => {
  const custId = parseInt(req.params.cid);
  try {
    const result = await db.query("SELECT * FROM customers WHERE id= $1", [
      custId,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/customers", async (req, res) => {
  const newName = req.body.name;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newCountry = req.body.country;

  try {
    const result = await db.query(
      "INSERT INTO customers (name, address, city, country) \
    VALUES ($1, $2, $3, $4) RETURNING id",
      [newName, newAddress, newCity, newCountry]
    );
    const newId = result.rows[0].id;
    console.log(`New Customer id = ${newId}`);
    res.status(200).json({ lastId: newId });
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
    let query = `
    SELECT
      products.id, products.product_name,
      product_availability.unit_price,
      suppliers.supplier_name
    FROM products
    JOIN product_availability ON products.id=product_availability.prod_id
    JOIN suppliers ON product_availability.supp_id=suppliers.id
  `;

    if (queryPattern) {
      query += "WHERE product_name ILIKE $1";
    }

    const params = queryPattern ? [`%${queryPattern}`] : [];

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/products", async (req, res) => {
  const newName = req.body.name;
  try {
    const result = await db.query(
      "INSERT INTO products (product_name) \
    VALUES ($1) RETURNING id",
      [newName]
    );
    const newId = result.rows[0].id;
    console.log(`New product id = ${newId}`);
    res.status(200).json({ lastId: newId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
