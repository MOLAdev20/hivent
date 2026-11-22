import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "../../database/schema";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(9, "Nomor HP tidak valid").optional(),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || "Input tidak valid",
    });
  }

  const { name, email, phone, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email sudah terdaftar",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [result] = await db.insert(users).values({
    name,
    email,
    phone: phone || null,
    passwordHash,
    role: "ATTENDEE",
  });

  const user = {
    id: Number(result.insertId),
    name,
    email,
    role: "ATTENDEE" as const,
  };

  const token = await signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  setCookie(event, "auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { user };
});
