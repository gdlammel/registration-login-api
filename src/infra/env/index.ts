import * as dotenv from "dotenv";
dotenv.config();
export const env = {
	port: process.env.PORT,
	secret: process.env.JWT_SECRET as string,
	expiresIn: process.env.JWT_EXPIRES_IN as string,
	emailHost: process.env.EMAIL_HOST as string,
	emailPort: process.env.EMAIL_PORT,
	emailUser: process.env.EMAIL_USER as string,
	emailPassword: process.env.EMAIL_PASSWORD as string,
	email: process.env.EMAIL,
	forgotPasswordSecret: process.env.JWT_FORGOT_PASSWORD_SECRET as string,
	forgotPasswordExpiresIn: process.env
		.JWT_FORGOT_PASSWORD_EXPIRES_IN as string,
	jwt2FaSecret: process.env.JWT_2FA_SECRET as string,
	jwt2FaExpiresIn: process.env.JWT_2FA_EXPIRES_IN as string,
};
