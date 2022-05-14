const argon2 = require("argon2");

const hashPassword = async (password) => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 15360,
    timeCost: 2,
    parallelism: 1,
  });
};

module.exports = {
  hashPassword,
};
