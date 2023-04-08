export interface Controller<TRequest, TResponse> {
	handle(requestDTO?: TRequest): Promise<TResponse>;
}
