import { eq } from "drizzle-orm";
import { users } from "../../database/schema";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  if (!token) return { user: null };

  const payload = await verifyToken(token);
  if (!payload) return { user: null };

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.userId),
    columns: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return { user: user || null };
});
