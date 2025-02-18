import { register } from "@/controllers/auth/register";
import { apiController } from "@/utils/controller";

export const POST = apiController(register);
