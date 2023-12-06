require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const { HTTP_PORT } = process.env;

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

app.listen(HTTP_PORT, () => console.log("listening on port", HTTP_PORT));

//1.Buat model
// npx sequelize-cli model:generate --name  --attributes name:string,email:string,password:string,confirmPassworUserd:string,role:string

//2.Migrate mode
// sequelize-cli db:migrate
