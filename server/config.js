require("dotenv").config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
module.exports = { MONGO_DB_URL, PORT, JWT_SECRET_KEY, STRIPE_SECRET_KEY };
