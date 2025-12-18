import './chat-list-item.scss';
import { Block } from '@/core/Block';
import Handlebars from 'handlebars';
import template from '@/components/features/ChatListItem/template';

interface ChatListItemProps extends Record<string, unknown> {
  avatarUrl: string;
  title: string;
  message: string;
  time: string;
  badge: number
}

export default class ChatListItem extends Block<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super('li', props);
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
