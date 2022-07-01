const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const User = require("../models/User");

const api = supertest(app);

describe("user creation", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  test("successfully create new user", async () => {
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
        isAdmin: false,
      })
    );
  });

  test("creating user with non unique username fails", async () => {
    const newUser = {
      username: "test",
      email: "test65456487@mail.com",
      password: "12345",
    };

    const response = await api
      .post("/api/v1/auth/register")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({ message: "User already exists" });
  });
  test("creating user with non unique mail fails", async () => {
    const newUser = {
      username: "testa6s5d4f65as4df",
      email: "test@mail.com",
      password: "12345",
    };

    const response = await api
      .post("/api/v1/auth/register")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({ message: "User already exists" });
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
