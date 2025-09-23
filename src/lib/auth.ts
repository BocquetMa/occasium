import { getServerSession } from "next-auth/next";
import type { NextApiRequest } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]"; // si tu utilises NextAuth
import type { User } from "next-auth";

export const getSession = async ({ req }: { req: NextApiRequest }) => {
  const session = await getServerSession(req, undefined, authOptions);
  return session;
};