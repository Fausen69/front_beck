import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

export async function hashPass(pass: string): Promise<string> {
  if (!pass || pass.length < 8) {
    throw new Error("Пароль слишком короткий");
  }
  return bcrypt.hash(pass, SALT_ROUNDS);
}

export async function verifyPass(plainPass: string, hashedPass: string): Promise<boolean> {
  if (!plainPass || !hashedPass) return false;
  return bcrypt.compare(plainPass, hashedPass);
}