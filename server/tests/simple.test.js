const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");

const api = supertest(app);

describe("tests without user logged in", () => {
  test("products are returned as json", async () => {
    await api
      .get("/api/v1/products")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
