import BackLink from '@/components/features/BackLink/backLink';
import ProfileAvatar from '@/components/features/ProfileAvatar/profileAvatar';
import Link from '@/components/ui/link/link';
import Footer from '@/components/ui/footer/footer';
import { Block } from '@/core/Block';
import Handlebars from 'handlebars';
import template from '@/pages/Profile/Profile/template';
import AuthController from '@/controllers/AuthController';
import store, { StoreEvents } from '@/core/Store';

interface ProfilePageProps extends Record<string, unknown> {
  BackLink: BackLink,
  ProfileAvatar: ProfileAvatar,
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  ChangeProfileLink: Link;
  ChangePasswordLink: Link;
  LogoutLink: Link;
  FooterComponent: Footer
}

export default class ProfilePage extends Block<ProfilePageProps> {
  constructor() {
    super('div', {
      BackLink: new BackLink({
        href: '#',
        dataPage: 'messenger',
      }),
      ProfileAvatar: new ProfileAvatar({
        url: '',
      }),

      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',

      ChangeProfileLink: new Link({
        href: '#',
        dataPage: 'update-profile',
        text: 'Изменить данные',
      }),
      ChangePasswordLink: new Link({
        href: '#',
        dataPage: 'password',
        text: 'Изменить пароль',
      }),
      LogoutLink: new Link({
        href: '#',
        dataPage: 'login',
        text: 'Выйти',
      }),
      FooterComponent: new Footer(),
    });

    store.on(StoreEvents.Updated, () => {
      const { user } = store.getState();

      if (user) {
        this.setProps({
          email: user.email,
          login: user.login,
          first_name: user.first_name,
          second_name: user.second_name,
          display_name: user.display_name,
          phone: user.phone,
        });

        const avatarBlock = this.children.ProfileAvatar;
        if (avatarBlock instanceof Block) {
          avatarBlock.setProps({
            url: user.avatar_url,
          });
        }
      }
    });
  }

  componentDidMount(_oldProps: ProfilePageProps) {
    AuthController.fetchUser();
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
