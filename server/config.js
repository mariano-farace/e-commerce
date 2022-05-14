require("dotenv").config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;

module.exports = { MONGO_DB_URL, PORT };
