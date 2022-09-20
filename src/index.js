const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fetch = require("node-fetch");

const { PORT, dbconfig } = require("./config");

const app = express();

const users_db = require("./routes/usersdb");
app.use(express.json());
app.use(cors());

app.use("/api/", users_db);

//postina tik pirma useri
app.get("/", async (req, res) => {
  try {
    const randomUsers = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    const [randomUsersResponse] = await randomUsers.json(); //nuemus lauztinius skliaustus gaunu undefined
    for (let j = 0; j < 10; j++) {
      const firstName = randomUsersResponse.name;
      const email = randomUsersResponse.email;
      const street = randomUsersResponse.address.street;
      const city = randomUsersResponse.address.city;
      console.log(firstName);

      const con = await mysql.createConnection(dbconfig);
      await con.execute(
        `INSERT INTO users_db1 (name,email,street,city) VALUES (${mysql.escape(
          firstName
        )},${mysql.escape(email)},${mysql.escape(street)},${mysql.escape(
          city
        )})`
      );
      const [response] = await con.execute("SELECT * FROM users_db1");
      res.send(response);
      await con.end();
    }
  } catch (e) {
    console.log(e);
  }
});
//neveikia
// app.get("/", async (req, res) => {
//   try {
//     const randomUsers = () => {
//       fetch("https://jsonplaceholder.typicode.com/users")
//         .then((resp) => resp.json())
//         .then((response) => {
//           for (let j = 0; j < response.lenght; j++) {
//             const firstName = response.name;
//             const email = response.email;
//             const street = response.street;
//             const city = response.city;
//             console.log(firstName);

//             const con = mysql.createConnection(dbconfig);
//             con.execute(
//               `INSERT INTO users_db1 (name,email,street,city) VALUES (${mysql.escape(
//                 firstName
//               )},${mysql.escape(email)},${mysql.escape(street)},${mysql.escape(
//                 city
//               )})`
//             );
//             const [response] = con.execute("SELECT * FROM users_db1");
//             res.send(response);
//             con.end();
//           }
//         });

//       randomUsers();
//     };
//   } catch (e) {
//     console.log(e);
//   }
// });

app.all("*", async (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
