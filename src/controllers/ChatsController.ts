import store from '@/core/Store';
import { chatsList } from '@/mockData';

class ChatsController {
  public fetchChats() {
    store.set('chats', chatsList);
  }

  public sendMessage(data: Record<string, string>) {
    console.log('Сообщение отправлено', data);
  }
}

export default new ChatsController();
