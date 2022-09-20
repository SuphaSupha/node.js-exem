const express = require("express");
const mysql = require("mysql2/promise");

const { dbconfig } = require("../config");

const router = express.Router();

//2.1
router.post("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const data = req.body;
    const response = await con.execute(
      `INSERT INTO users_db (name, email, street, city) values (${con.escape(
        data.name
      )}, ${con.escape(data.email)}, ${con.escape(data.street)}, ${con.escape(
        data.city
      )})`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

//2.2
router.get("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute("SELECT * FROM users_db ");
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});
//2.3
router.get("/users/names", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute("SELECT id , name FROM users_db ");
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

//2.4
router.get("/users/emails", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      "SELECT id , name, email FROM users_db "
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});
//2.5
router.get("/users/address", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      "SELECT  CONCAT(street,', ', city) address FROM users_db"
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
