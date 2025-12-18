import { Block } from '@/core/Block';
import Input from '@/components/ui/input/input';
import Button from '@/components/ui/button/button';
import Link from '@/components/ui/link/link';
import Handlebars from 'handlebars';
import template from '@/pages/Auth/Register/template';
import Footer from '@/components/ui/footer/footer';
import { ValidateRuleType } from '@/utils/validators';
import AuthController from '@/controllers/AuthController';

interface RegisterPageProps extends Record<string, unknown> {
  EmailInput: Input;
  LoginInput: Input;
  FirstNameInput: Input;
  SecondNameInput: Input;
  PhoneInput: Input;
  PasswordInput: Input;
  RepeatPasswordInput: Input;
  SubmitButton: Button;
  LoginPageLink: Link;
  FooterComponent: Footer;
}

export default class RegisterPage extends Block<RegisterPageProps> {
  constructor() {
    super('div', {
      EmailInput: new Input({
        id: 'email',
        name: 'email',
        type: 'text',
        placeholder: 'Почта',
        isBordered: true,
        rule: ValidateRuleType.Email,
      }),
      LoginInput: new Input({
        id: 'login',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        isBordered: true,
        rule: ValidateRuleType.Login,
      }),
      FirstNameInput: new Input({
        id: 'first_name',
        name: 'first_name',
        type: 'text',
        placeholder: 'Имя',
        isBordered: true,
        rule: ValidateRuleType.Name,
      }),
      SecondNameInput: new Input({
        id: 'second_name',
        name: 'second_name',
        type: 'text',
        placeholder: 'Фамилия',
        isBordered: true,
        rule: ValidateRuleType.Name,
      }),
      PhoneInput: new Input({
        id: 'phone',
        name: 'phone',
        type: 'text',
        placeholder: 'Телефон',
        isBordered: true,
        rule: ValidateRuleType.Phone,
      }),
      PasswordInput: new Input({
        id: 'password',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        isBordered: true,
        rule: ValidateRuleType.Password,
      }),
      RepeatPasswordInput: new Input({
        id: 'repeat-password',
        name: 'repeat-password',
        type: 'password',
        placeholder: 'Пароль (ещё раз)',
        isBordered: true,
        rule: ValidateRuleType.Password,
      }),
      SubmitButton: new Button({
        id: 'submitRegister',
        text: 'Зарегистрироваться',
        type: 'submit',
      }),
      LoginPageLink: new Link({
        href: '#',
        text: 'Войти',
        isActive: true,
        dataPage: 'login',
      }),
      FooterComponent: new Footer(),

      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const emailInput = this.children.EmailInput as Input;
          const loginInput = this.children.LoginInput as Input;
          const firstNameInput = this.children.FirstNameInput as Input;
          const secondNameInput = this.children.SecondNameInput as Input;
          const phoneInput = this.children.PhoneInput as Input;
          const passwordInput = this.children.PasswordInput as Input;

          const isEmailInputValid = emailInput.validate();
          const isLoginInputValid = loginInput.validate();
          const isFirstNameInputValid = firstNameInput.validate();
          const isSecondNameInputValid = secondNameInput.validate();
          const isPhoneInputValid = phoneInput.validate();
          const isPasswordInputValid = passwordInput.validate();

          if (
            !isEmailInputValid
                        || !isLoginInputValid
                        || !isFirstNameInputValid
                        || !isSecondNameInputValid
                        || !isPhoneInputValid
                        || !isPasswordInputValid
          ) {
            console.log('Валидация не пройдена');
            return;
          }

          const data = {
            [emailInput.getName()]: emailInput.getValue(),
            [loginInput.getName()]: loginInput.getValue(),
            [firstNameInput.getName()]: firstNameInput.getValue(),
            [secondNameInput.getName()]: secondNameInput.getValue(),
            [phoneInput.getName()]: phoneInput.getValue(),
            [passwordInput.getName()]: passwordInput.getValue(),
          };

          AuthController.signUp(data);
        },
      },
    });
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
