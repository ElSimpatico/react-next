import { login } from "@/controllers/auth/login";
import { apiController } from "@/utils/controller";

export const POST = apiController(login);
