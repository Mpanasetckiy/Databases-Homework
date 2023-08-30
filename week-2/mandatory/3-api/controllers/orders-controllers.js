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

const getOrdersByCustId = async (req, res) => {
  const custId = req.params.cid;

  try {
    const result = await db.query(
      "SELECT orders.order_date, orders.order_reference,\
       products.product_name, order_items.quantity, \
       product_availability.unit_price, \
       suppliers.supplier_name \
       FROM orders \
       JOIN order_items ON orders.id=order_items.order_id\
       JOIN products ON order_items.product_id = products.id \
       JOIN product_availability ON order_items.product_id = product_availability.prod_id AND order_items.supplier_id=product_availability.supp_id \
       JOIN suppliers ON product_availability.supp_id=suppliers.id \
       WHERE orders.customer_id = $1",
      [custId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.addOrderByCustId = addOrderByCustId;
exports.deleteOrder = deleteOrder;
exports.getOrdersByCustId = getOrdersByCustId;
