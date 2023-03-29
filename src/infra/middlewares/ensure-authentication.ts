import { Request, Response, NextFunction } from "express";
import { ResponseData } from "../controllers/common";
import { verify } from "jsonwebtoken";
import { env } from "@/main/config";

interface IPayload {
	sub: string;
}

export class EnsureAuthenticationMiddleware {
	static verify(request: Request, response: Response, next: NextFunction) {
		const authToken = request.headers.authorization;

		if (!authToken) {
			const responseData = ResponseData.unauthorized("Invalid Token");
			return response.status(responseData.statusCode).json(responseData);
		}

		const [_, token] = authToken.split(" ");
		try {
			const { sub } = verify(token, env.secret) as IPayload;
			const body = request.body;
			body.id = sub;
			request.body = body;
			return next();
		} catch (error) {
			const responseData = ResponseData.unauthorized("Unauthorized");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
