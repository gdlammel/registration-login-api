export interface UseCase<IInput, IOutput> {
	execute(input?: IInput): Promise<IOutput> | IOutput;
}
