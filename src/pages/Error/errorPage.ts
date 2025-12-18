import { Block } from '@/core/Block';
import Link from '@/components/ui/link/link';
import Footer from '@/components/ui/footer/footer';
import Handlebars from 'handlebars';
import template from '@/pages/Error/template';

interface ErrorPageProps extends Record<string, unknown> {
  title: string;
  subtitle: string;
  BackToMessengerLink: Link;
  FooterComponent: Footer;
}

export default class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: Partial<ErrorPageProps>) {
    super('div', {
      title: props.title || 'ERROR',
      subtitle: props.subtitle || 'Неизвестная ошибка',
      BackToMessengerLink: new Link({
        href: '#',
        text: 'Назад к чатам',
        isActive: true,
        dataPage: 'messenger',
      }),
      FooterComponent: new Footer(),
    });
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
