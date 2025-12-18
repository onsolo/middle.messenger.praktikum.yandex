import BackLink from '@/components/features/BackLink/backLink';
import ProfileAvatar from '@/components/features/ProfileAvatar/profileAvatar';
import Input from '@/components/ui/input/input';
import Button from '@/components/ui/button/button';
import Footer from '@/components/ui/footer/footer';
import { Block } from '@/core/Block';
import { currentUser } from '@/mockData';
import template from '@/pages/Profile/UpdatePassword/template';
import Handlebars from 'handlebars';
import { ValidateRuleType } from '@/utils/validators';

interface UpdatePasswordPageProps extends Record<string, unknown> {
  BackLink: BackLink,
  ProfileAvatar: ProfileAvatar,
  OldPasswordInput: Input,
  NewPasswordInput: Input,
  RepeatPasswordInput: Input,
  SubmitButton: Button;
  FooterComponent: Footer
}

export default class UpdatePasswordPage extends Block<UpdatePasswordPageProps> {
  constructor() {
    super('div', {
      BackLink: new BackLink({
        href: '#',
        dataPage: 'profile',
      }),
      ProfileAvatar: new ProfileAvatar({
        url: currentUser.avatar_url,
      }),
      OldPasswordInput: new Input({
        id: 'oldPassword',
        name: 'oldPassword',
        type: 'password',
        rule: ValidateRuleType.Password,
      }),
      NewPasswordInput: new Input({
        id: 'newPassword',
        name: 'newPassword',
        type: 'password',
        rule: ValidateRuleType.Password,
      }),
      RepeatPasswordInput: new Input({
        id: 'repeatPassword',
        name: 'repeatPassword',
        type: 'password',
      }),
      SubmitButton: new Button({
        id: 'submitChangePassword',
        text: 'Сохранить',
      }),
      FooterComponent: new Footer(),

      events: {
        submit: (e: Event) => {
          e.preventDefault();

          const oldPasswordInput = this.children.OldPasswordInput as Input;
          const newPasswordInput = this.children.NewPasswordInput as Input;

          const isOldPasswordInputValid = oldPasswordInput.validate();
          const isNewPasswordInput = newPasswordInput.validate();

          if (!isOldPasswordInputValid || !isNewPasswordInput) {
            console.log('Валидация не пройдена');
            return;
          }

          const data = {
            [oldPasswordInput.getName()]: oldPasswordInput.getValue(),
            [newPasswordInput.getName()]: newPasswordInput.getValue(),
          };

          console.log('Данные формы:', data);
          // Тут будет вызываться UserController.updatePassword(data);
        },
      },
    });
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
