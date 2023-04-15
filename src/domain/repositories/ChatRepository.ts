import { Chat } from '../models/Chat';

export interface ChatRepository {
  getById: (chatId: string) => Promise<Chat>;
  save: (chat: Chat) => Promise<void>;
}
