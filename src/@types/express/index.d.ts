import { ValidatedUser } from "@/infra/validators";

declare module "express-serve-static-core" {
	interface Request {
		user: ValidatedUser;
	}
}
