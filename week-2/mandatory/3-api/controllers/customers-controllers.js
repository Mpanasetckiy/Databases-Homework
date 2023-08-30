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

exports.getAllCustomers = getAllCustomers;
exports.getCustomerById = getCustomerById;
exports.addCustomer = addCustomer;