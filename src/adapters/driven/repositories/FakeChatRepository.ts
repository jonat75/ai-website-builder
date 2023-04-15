import { ChatRepository } from '../../../domain/repositories/ChatRepository';
import { Chat } from '../../../domain/models/Chat';

export class FakeChatRepository implements ChatRepository {
  private _chats: Record<string, Chat> = {};
  getById(chatId: string): Promise<Chat> {
    return Promise.resolve(this._chats[chatId]);
  }
  save(chat: Chat): Promise<void> {
    this._chats[chat.id] = chat;
    return Promise.resolve(undefined);
  }

  feedsWith(...chats: Array<Chat>): void {
    chats.forEach((chat) => (this._chats[chat.id] = chat));
  }

  get chats() {
    return this._chats;
  }
}
