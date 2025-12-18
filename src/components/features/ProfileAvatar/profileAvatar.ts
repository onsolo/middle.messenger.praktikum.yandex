import './profile-avatar.scss';
import { Block } from '@/core/Block';
import Input, { InputProps } from '@/components/ui/input/input';
import Handlebars from 'handlebars';
import template from '@/components/features/ProfileAvatar/template';

interface ProfileAvatarProps extends Record<string, unknown> {
  url: string;
  ProfileAvatarInput: Block<InputProps>
}

export default class ProfileAvatar extends Block<ProfileAvatarProps> {
  constructor(props: Omit<ProfileAvatarProps, 'ProfileAvatarInput'>) {
    super('div', {
      url: props.url as string,
      ProfileAvatarInput: new Input({
        id: 'avatar',
        name: 'avatar',
        type: 'file',
        accept: 'image/*',
      }),
    });
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
