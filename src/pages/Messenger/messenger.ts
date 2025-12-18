import { Block } from '@/core/Block';
import Handlebars from 'handlebars';
import template from '@/pages/Messenger/template';
import Link from '@/components/ui/link/link';
import Input from '@/components/ui/input/input';
import ChatListItem from '@/components/features/ChatListItem/ChatListItem';
import Footer from '@/components/ui/footer/footer';
import { ValidateRuleType } from '@/utils/validators';
import store, { StoreEvents } from '@/core/Store';
import ChatsController from '@/controllers/ChatsController';

interface MessengerPageProps extends Record<string, unknown> {
  ProfileLink: Link;
  SearchInput: Input;
  chatsList: ChatListItem[];
  MessageInput: Input;
  FooterComponent: Footer;
}

export default class MessengerPage extends Block<MessengerPageProps> {
  constructor() {
    super('div', {
      ProfileLink: new Link({
        href: '#',
        dataPage: 'profile',
        text: 'Профиль',
      }),
      SearchInput: new Input({
        id: 'search',
        name: 'search',
        type: 'text',
        placeholder: 'Поиск',
        isFilled: true,
      }),
      chatsList: [],
      MessageInput: new Input({
        id: 'message',
        name: 'message',
        type: 'text',
        placeholder: 'Введите сообщение',
        value: '',
        rule: ValidateRuleType.Message,
      }),
      FooterComponent: new Footer(),

      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const messageInput = this.children.MessageInput as Input;
          const isMessageInputValid = messageInput.validate();

          if (!isMessageInputValid) {
            console.log('Валидация не пройдена');
            return;
          }

          const data = {
            [messageInput.getName()]: messageInput.getValue(),
          };

          ChatsController.sendMessage(data);
        },
      },
    });

    store.on(StoreEvents.Updated, () => {
      const { chats } = store.getState();

      this.setProps({
        chatsList: chats.map((chat) => new ChatListItem({
          avatarUrl: chat.avatarUrl,
          title: chat.title,
          message: chat.message,
          time: chat.time,
          badge: chat.badge,
        })),
      });
    });
  }

  componentDidMount(_oldProps: MessengerPageProps) {
    ChatsController.fetchChats();
  }

  componentDidUpdate(_oldProps: MessengerPageProps, _newProps: MessengerPageProps): boolean {
    if (_newProps.chatsList) {
      this.children.chatsList = _newProps.chatsList as Block<Record<string, unknown>>[];
    }

    return true;
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
