import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    globalRole: Role;
  }

  interface Session {
    user: User;
  }
}