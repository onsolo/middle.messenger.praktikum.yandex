import { EventBus } from '@/core/EventBus';
import { Chat, User } from '@/mockData';

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  chats: Chat[];
  user: User | null;
  [key: string]: unknown;
}

type StoreEventsMap = {
  [StoreEvents.Updated]: [];
};

export class Store extends EventBus<StoreEventsMap> {
  private state: State = {
    chats: [],
    user: null,
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state[path] = value;

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
