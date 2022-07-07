import "dotenv/config";

export const MONGO_DB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_DB_URL;

export const PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
