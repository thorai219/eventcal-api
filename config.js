require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "hello1234";

const PORT = +process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || "WHG43Jx3Z8TL7gK7";

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "eventcal_test";
} else {
  DB_URI = process.env.DATABASE_URL || "eventcal";
}

module.exports = { SECRET_KEY, PORT, DB_URI, API_KEY };
