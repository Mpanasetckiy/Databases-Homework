const db = require("../db");

const addOrderByCustId = async (req, res) => {
  const custId = req.body.cust_id;
  const orderDate = req.body.order_date;
  const orderReference = req.body.order_reference;

  try {
    const result = await db.query(
      "SELECT * FROM customers \
      WHERE id = $1 ",
      [custId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Customer doesn't exist" });
    }

    const response = await db.query(
      "SELECT * FROM orders \
      WHERE order_reference = $1",
      [orderReference]
    );

    if (response.rows.length > 0) {
      return res.status(400).json({ error: "Order already exists" });
    }

    await db.query(
      "INSERT INTO orders (order_date, order_reference, customer_id) \
      VALUES ($1, $2, $3)",
      [orderDate, orderReference, custId]
    );
    res.status(201).json({ message: "Order successfully created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.oid;

  try {
    await db.query("DELETE FROM order_items WHERE order_id = $1", [orderId]);
    await db.query("DELETE FROM orders WHERE id = $1", [orderId]);
    res.status(201).json({ message: "Order successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.addOrderByCustId = addOrderByCustId;
exports.deleteOrder = deleteOrder;
