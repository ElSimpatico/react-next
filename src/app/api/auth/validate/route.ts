import { validate } from "@/controllers/auth/validate";
import { apiController } from "@/utils/controller";

export const GET = apiController(validate);
