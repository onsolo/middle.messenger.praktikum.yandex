import { Block } from '@/core/Block';
import Input from '@/components/ui/input/input';
import Button from '@/components/ui/button/button';
import Link from '@/components/ui/link/link';
import Handlebars from 'handlebars';
import template from '@/pages/Auth/Login/template';
import Footer from '@/components/ui/footer/footer';
import { ValidateRuleType } from '@/utils/validators';
import AuthController from '@/controllers/AuthController';

interface LoginPageProps extends Record<string, unknown> {
  NameInput: Input;
  PasswordInput: Input;
  SubmitButton: Button;
  RegisterPageLink: Link;
  FooterComponent: Footer;
}

export default class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super('div', {
      NameInput: new Input({
        id: 'login',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        isBordered: true,
        rule: ValidateRuleType.Login,
      }),
      PasswordInput: new Input({
        id: 'password',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        isBordered: true,
        rule: ValidateRuleType.Password,
      }),
      SubmitButton: new Button({
        id: 'submitLogin',
        text: 'Войти',
        type: 'submit',
      }),
      RegisterPageLink: new Link({
        href: '#',
        text: 'Нет аккаунта?',
        isActive: true,
        dataPage: 'register',
      }),
      FooterComponent: new Footer(),

      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const nameInput = this.children.NameInput as Input;
          const passwordInput = this.children.PasswordInput as Input;

          const isNameValid = nameInput.validate();
          const isPasswordValid = passwordInput.validate();

          if (!isNameValid || !isPasswordValid) {
            console.log('Валидация не пройдена');
            return;
          }

          const data = {
            [nameInput.getName()]: nameInput.getValue(),
            [passwordInput.getName()]: passwordInput.getValue(),
          };

          AuthController.signIn(data);
        },
      },
    });
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
