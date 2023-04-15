import { AIChatGateway } from '../gateways/AIChatGateway';
import { ChatRepository } from '../repositories/ChatRepository';
import { Chat } from '../models/Chat';
import { UseCase } from '../models/UseCase';
import { AppBuilder } from '../models/AppBuilder';

interface BuildAppCommand {
  appContext: string;
  chatId?: string;
}

export class BuildApp implements UseCase {
  constructor(
    private aiChatGateway: AIChatGateway,
    private chatRepository: ChatRepository,
    private appBuilder: AppBuilder,
  ) {}
  async execute(command: BuildAppCommand): Promise<string> {
    const chat = await this.initChat(command);
    const prompt = command.appContext;
    const chatResponse = await this.aiChatGateway.chat(prompt, chat);
    chat.addResponse(chatResponse);
    await this.chatRepository.save(chat);
    await this.appBuilder.buildAppFromResponse(chatResponse);
    return Promise.resolve(undefined);
  }

  private async initChat(command: BuildAppCommand): Promise<Chat> {
    if (command.chatId)
      return await this.chatRepository.getById(command.chatId);
    return Promise.resolve(new Chat());
  }
}
