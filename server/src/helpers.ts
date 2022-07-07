import { hash, argon2id } from "argon2";

export const hashPassword = async (password: string | Buffer) => {
  return await hash(password, {
    type: argon2id,
    memoryCost: 15360,
    timeCost: 2,
    parallelism: 1,
  });
};
