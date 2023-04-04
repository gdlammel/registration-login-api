import { Request, Response, NextFunction } from "express";
import { HttpResponseFormatter } from "@/infra/common";
import { verify } from "jsonwebtoken";

interface IPayload {
	sub: string;
}

export class EnsureAuthenticationMiddleware {
	constructor(private secret: string) {}
	public verify(request: Request, response: Response, next: NextFunction) {
		const authToken = request.headers.authorization;
		if (!authToken) {
			const responseData =
				HttpResponseFormatter.unauthorized("Invalid Token");
			return response.status(responseData.statusCode).json(responseData);
		}

		const [_, token] = authToken.split(" ");
		try {
			const { sub } = verify(token, this.secret) as IPayload;
			const body = request.body;
			body.id = sub;
			request.body = body;
			return next();
		} catch (error) {
			const responseData =
				HttpResponseFormatter.unauthorized("Unauthorized");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
