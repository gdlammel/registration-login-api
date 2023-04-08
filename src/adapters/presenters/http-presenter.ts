export interface IHttpResponse<T>{
	statusCode: number
	data: T
}
export class HttpPresenter{
	static badRequest<T>(data: T): IHttpResponse<T> {
		return {
			statusCode: 400,
			data,
		};
	}

	static internalError<T>(data: T): IHttpResponse<T> {
		return {
			statusCode: 500,
			data,
		};
	}

	static created<T>(data: T): IHttpResponse<T>{
		return {
			statusCode: 201,
			data,
		};
	}

	static ok<T>(data: T): IHttpResponse<T>{
		return {
			statusCode: 200,
			data,
		};
	}
	static unauthorized<T>(data: T): IHttpResponse<T>{
		return {
			statusCode: 401,
			data,
		};
	}
}
