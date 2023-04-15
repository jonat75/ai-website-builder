import { v4 } from 'uuid';

export class Chat {
  private _id: string;

  constructor(private _history: Array<string> = []) {
    this._id = v4();
  }

  addResponse(chatResponse: unknown) {
    if (typeof chatResponse === 'string') this._history.push(chatResponse);
  }

  get id(): string {
    return this._id;
  }
}
