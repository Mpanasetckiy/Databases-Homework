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

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
