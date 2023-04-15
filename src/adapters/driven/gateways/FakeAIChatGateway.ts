import { AIChatGateway } from '../../../domain/gateways/AIChatGateway';
import { Chat } from '../../../domain/models/Chat';

export class FakeAIChatGateway implements AIChatGateway {
  constructor(private _calls: number = 0) {}
  chat = (prompt: string, chat: Chat): Promise<string> => {
    this._calls++;
    return Promise.resolve('test');
  };

  get calls() {
    return this._calls;
  }
}
