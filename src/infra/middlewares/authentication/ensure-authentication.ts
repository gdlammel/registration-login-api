import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { HttpPresenter } from "@/adapters/presenters";

interface IPayload {
	sub: string;
}

export class EnsureAuthenticationMiddleware {
	constructor(private secret: string) {}
	public verify(request: Request, response: Response, next: NextFunction) {
		const authToken = request.headers.authorization;
		if (!authToken) {
			const responseData = HttpPresenter.unauthorized("Invalid Token");
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
			const responseData = HttpPresenter.unauthorized("Unauthorized");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
