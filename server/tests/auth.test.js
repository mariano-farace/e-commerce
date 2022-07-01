const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const User = require("../models/User");

const api = supertest(app);

describe("user creation", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  test("create new user", async () => {
    const newUser = {
      username: "test",
      email: "test@mail.com",
      password: "12345",
    };

    const response = await api
      .post("/api/v1/auth/register")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        email: "test@mail.com",
        username: "test",
      })
    );
  });
});

describe("user login", () => {
  test("successfully login", async () => {
    const loginDetails = {
      username: "test",
      password: "12345",
    };

    const response = await api
      .post("/api/v1/auth/login")
      .send(loginDetails)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        email: "test@mail.com",
        username: "test",
      })
    );
  });
  test("fail login wrong username", async () => {
    const loginDetails = {
      username: "test6456asd4f",
      password: "12345",
    };

    const response = await api
      .post("/api/v1/auth/login")
      .send(loginDetails)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({ message: "Wrong credentials" });
  });
  test("fail login wrong password", async () => {
    const loginDetails = {
      username: "test",
      password: "123a45",
    };

    const response = await api
      .post("/api/v1/auth/login")
      .send(loginDetails)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({ message: "Wrong credentials" });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
