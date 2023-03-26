export class ResponseData {
	static badRequest<T>(data: T) {
		const responseJson = {
			statusCode: 400,
			value: data,
		};

		return responseJson;
	}

	static internalError<T>(data: T) {
		const responseJson = {
			statusCode: 500,
			value: data,
		};

		return responseJson;
	}

	static created<T>(data: T) {
		const responseJson = {
			statusCode: 201,
			value: data,
		};

		return responseJson;
	}
}
