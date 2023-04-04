export class HttpResponseFormatter<T> {
	static badRequest<T>(data: T) {
		return {
			statusCode: 400,
			value: data,
		};
	}

	static internalError<T>(data: T) {
		return {
			statusCode: 500,
			value: data,
		};
	}

	static created<T>(data: T) {
		return {
			statusCode: 201,
			value: data,
		};
	}

	static ok<T>(data: T) {
		return {
			statusCode: 200,
			value: data,
		};
	}
	static unauthorized<T>(data: T) {
		return {
			statusCode: 401,
			value: data,
		};
	}
}
