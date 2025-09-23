import { User } from "@prisma/client";

declare module "next" {
  interface NextApiRequest {
    user?: User | any; 
  }
}
