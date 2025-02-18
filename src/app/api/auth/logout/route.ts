import { logout } from "@/controllers/auth/logout";
import { apiController } from "@/utils/controller";

export const POST = apiController(logout);
