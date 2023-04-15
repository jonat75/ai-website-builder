export interface UseCase {
  execute(command: unknown): Promise<unknown>;
}
