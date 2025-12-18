import './button.scss';
import { Block } from '@/core/Block';
import template from '@/components/ui/button/template';
import Handlebars from 'handlebars';

export interface ButtonProps extends Record<string, unknown> {
  id?: string;
  text: string;
  type?: 'submit' | 'button' | 'reset';
  events?: {
    click: (e: Event) => void;
  };
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
