import './footer.scss';
import template from '@/components/ui/footer/template';
import { Block } from '@/core/Block';
import Link, { LinkProps } from '@/components/ui/link/link';
import Handlebars from 'handlebars';

export interface FooterPros extends Record<string, unknown> {
  LoginPageLink: Block<LinkProps>;
  SignUpPageLink: Block<LinkProps>;
  MessengerPageLink: Block<LinkProps>;
  ProfilePageLink: Block<LinkProps>;
  UpdateProfilePageLink: Block<LinkProps>;
  UpdatePasswordPageLink: Block<LinkProps>;
  Error404PageLink: Block<LinkProps>;
  Error500PageLink: Block<LinkProps>;
}

export default class Footer extends Block<FooterPros> {
  constructor() {
    super('footer', {
      LoginPageLink: new Link({
        href: '#',
        text: 'Авторизация',
        dataPage: 'login',
      }),
      SignUpPageLink: new Link({
        href: '#',
        text: 'Регистрация',
        dataPage: 'register',
      }),
      MessengerPageLink: new Link({
        href: '#',
        text: 'Мессенджер',
        dataPage: 'messenger',
      }),
      ProfilePageLink: new Link({
        href: '#',
        text: 'Профиль',
        dataPage: 'profile',
      }),
      UpdateProfilePageLink: new Link({
        href: '#',
        text: 'Изменение профиля',
        dataPage: 'update-profile',
      }),
      UpdatePasswordPageLink: new Link({
        href: '#',
        text: 'Изменение пароля',
        dataPage: 'password',
      }),
      Error404PageLink: new Link({
        href: '#',
        text: '404',
        dataPage: '404',
      }),
      Error500PageLink: new Link({
        href: '#',
        text: '500',
        dataPage: '500',
      }),
    });
  }

  override render() {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
