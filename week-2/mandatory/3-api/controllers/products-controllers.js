const db = require("../db");

const getAllProducts = async (req, res) => {
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
};

const addProduct = async (req, res) => {
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
};

const addProductAvailability = async (req, res) => {
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
};

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.addProductAvailability = addProductAvailability;
