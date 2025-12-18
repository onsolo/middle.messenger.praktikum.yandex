import BackLink from '@/components/features/BackLink/backLink';
import ProfileAvatar from '@/components/features/ProfileAvatar/profileAvatar';
import Footer from '@/components/ui/footer/footer';
import { Block } from '@/core/Block';
import Input from '@/components/ui/input/input';
import Button from '@/components/ui/button/button';
import Handlebars from 'handlebars';
import template from '@/pages/Profile/UpdateProfile/template';
import { ValidateRuleType } from '@/utils/validators';
import AuthController from '@/controllers/AuthController';
import store, { StoreEvents } from '@/core/Store';

interface UpdateProfilePageProps extends Record<string, unknown> {
  BackLink: BackLink,
  ProfileAvatar: ProfileAvatar,
  EmailInput: Input;
  LoginInput: Input;
  FirstNameInput: Input;
  SecondNameInput: Input;
  DisplayNameInput: Input;
  PhoneInput: Input;
  SubmitButton: Button;
  FooterComponent: Footer
}

export default class UpdateProfilePage extends Block<UpdateProfilePageProps> {
  constructor() {
    super('div', {
      BackLink: new BackLink({ href: '#', dataPage: 'profile' }),
      ProfileAvatar: new ProfileAvatar({
        url: 'src/assets/images/profile-avatar-stub.svg',
      }),
      EmailInput: new Input({
        id: 'email',
        name: 'email',
        type: 'text',
        placeholder: 'Введите E-mail',
        value: '',
        rule: ValidateRuleType.Email,
      }),
      LoginInput: new Input({
        id: 'login',
        name: 'login',
        type: 'text',
        placeholder: 'Введите логин',
        value: '',
        rule: ValidateRuleType.Login,
      }),
      FirstNameInput: new Input({
        id: 'first_name',
        name: 'first_name',
        type: 'text',
        placeholder: 'Введите имя',
        value: '',
        rule: ValidateRuleType.Name,
      }),
      SecondNameInput: new Input({
        id: 'second_name',
        name: 'second_name',
        type: 'text',
        placeholder: 'Введите фамилию',
        value: '',
        rule: ValidateRuleType.Name,
      }),
      DisplayNameInput: new Input({
        id: 'display_name',
        name: 'display_name',
        type: 'text',
        placeholder: 'Введите отображаемое имя',
        value: '',
      }),
      PhoneInput: new Input({
        id: 'phone',
        name: 'phone',
        type: 'text',
        placeholder: 'Введите телефон',
        value: '',
        rule: ValidateRuleType.Phone,
      }),
      SubmitButton: new Button({
        id: 'submitUpdateProfile',
        text: 'Сохранить',
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

          const isEmailInputValid = emailInput.validate();
          const isLoginInputValid = loginInput.validate();
          const isFirstNameInputValid = firstNameInput.validate();
          const isSecondNameInputValid = secondNameInput.validate();
          const isPhoneInputValid = phoneInput.validate();

          if (
            !isEmailInputValid
                        || !isLoginInputValid
                        || !isFirstNameInputValid
                        || !isSecondNameInputValid
                        || !isPhoneInputValid
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
          };

          console.log('Данные формы:', data);
          // Тут будет вызываться UserController.updateProfile(data);
        },
      },
    });

    store.on(StoreEvents.Updated, () => {
      const { user } = store.getState();

      if (user) {
        const EmailInput = this.children.EmailInput as Input;
        EmailInput.setProps({ value: user.email });

        const LoginInput = this.children.LoginInput as Input;
        LoginInput.setProps({ value: user.login });

        const FirstNameInput = this.children.FirstNameInput as Input;
        FirstNameInput.setProps({ value: user.first_name });

        const SecondNameInput = this.children.SecondNameInput as Input;
        SecondNameInput.setProps({ value: user.second_name });

        const DisplayNameInput = this.children.DisplayNameInput as Input;
        DisplayNameInput.setProps({ value: user.display_name });

        const PhoneInput = this.children.PhoneInput as Input;
        PhoneInput.setProps({ value: user.phone });
      }
    });
  }

  componentDidMount(_oldProps: UpdateProfilePageProps) {
    AuthController.fetchUser();
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
