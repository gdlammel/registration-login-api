import * as dotenv from "dotenv";
dotenv.config();
export const env = {
	port: process.env.PORT,
	secret: process.env.JWT_SECRET as string,
	expiresIn: process.env.JWT_EXPIRES_IN,
};
