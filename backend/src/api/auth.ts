import express, { Request, Response } from "express";
import { hashPass } from "../utils/hashPass";
import prisma from "../../db";

interface RegisterBody {
  username?: string;
  email?: string;
  password?: string;
}

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Требуется email и пароль" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Неверные учётные данные" });
    }

    res.status(200).json({ message: "Вход выполнен", userId: user.id });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Ошибка входа" });
  }
});

router.post("/logout", (req: Request, res: Response) => {

  res.status(200).json({ message: "Выход выполнен" });
});

router.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Валидация
    if (!email || !password || !username) {
      return res.status(400).json({ error: "Требуется имя пользователя, email и пароль" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Неверный формат email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Пароль должен содержать минимум 8 символов" });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existing) {
      return res.status(409).json({ error: "Пользователь с таким email или именем уже существует" });
    }

    const hashedPass = await hashPass(password);
    const newUser = await prisma.user.create({
      data: { 
        username, 
        email, 
        password: hashedPass 
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    });

    res.status(201).json({ message: "Пользователь зарегистрирован", user: newUser });
  } catch (e) {
    console.error("Ошибка регистрации:", e);
    res.status(500).json({ error: e instanceof Error ? e.message : "Ошибка регистрации" });
  }
});

export default router;