import { User as UserModel } from "@prisma/client";

export type User = Pick<UserModel, "email">;
