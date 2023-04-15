import { Chat } from '../models/Chat';

export interface AIChatGateway {
  chat: (prompt: string, chat: Chat) => Promise<unknown>;
}
