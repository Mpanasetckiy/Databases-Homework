const db = require("../db");

const getAllCustomers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getCustomerById = async (req, res) => {
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
};

const addCustomer = async (req, res) => {
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
};

const deleteCustomer = async (req, res) => {
  const custId = req.params.cid;
  try {
    const result = await db.query(
      "SELECT * FROM orders WHERE customer_id = $1",
      [custId]
    );

    if (result.rows.length > 0) {
      return res.status(400).json({ error: "Customer has active orders" });
    }
    await db.query("DELETE FROM customers WHERE id = $1", [custId]);
    res.status(201).json({ message: "Customer successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const updateCustomer = async (req, res) => {
  const custId = req.params.cid;
  const newName = req.body.name;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newCountry = req.body.country;

  try {
    await db.query(
      "UPDATE customers \
    SET name = $2, address = $3, city = $4, country = $5\
    WHERE id = $1",
      [custId, newName, newAddress, newCity, newCountry]
    );
    res.status(201).json({ message: "Customer successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAllCustomers = getAllCustomers;
exports.getCustomerById = getCustomerById;
exports.addCustomer = addCustomer;
exports.deleteCustomer = deleteCustomer;
exports.updateCustomer = updateCustomer;
