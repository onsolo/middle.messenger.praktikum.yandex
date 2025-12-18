import './input.scss';
import { Block } from '@/core/Block';
import template from '@/components/ui/input/template';
import Handlebars from 'handlebars';
import { validate, ValidateRuleType } from '@/utils/validators';

export interface InputProps extends Record<string, unknown> {
  id?: string;
  name: string;
  type: 'number' | 'text' | 'password' | 'file';
  value?: unknown;
  accept?: string;
  placeholder?: string;
  isBordered?: boolean;
  isFilled?: boolean;
  rule?: ValidateRuleType;
  events?: {
    input?: (e: Event) => void;
    change?: (e: Event) => void;
  };
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', props);
  }

  public validate(): boolean {
    if (!this.props.rule) return true;

    const input = this.element?.querySelector('input') as HTMLInputElement;
    if (!input) return false;

    const { value } = input;
    const error = validate(this.props.rule, value);

    if (error) {
      this.setError(error);
      return false;
    }

    this.clearError();
    return true;
  }

  public getValue(): string {
    const input = this.element?.querySelector('input') as HTMLInputElement;
    return input ? input.value : '';
  }

  public getName(): string {
    return this.props.name;
  }

  private onBlur() {
    this.validate();
  }

  private onFocus() {
    this.clearError();
  }

  private setError(message: string) {
    const errorElement = this.element?.querySelector('.input__error');
    const inputElement = this.element?.querySelector('input');

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
    if (inputElement) {
      inputElement.classList.add('invalid');
    }
  }

  private clearError() {
    const errorElement = this.element?.querySelector('.input__error');
    const inputElement = this.element?.querySelector('input');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
    if (inputElement) {
      inputElement.classList.remove('invalid');
    }
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);

    const fragment = this.compile(compiled, this.props);

    const inputElement = fragment.querySelector('input');

    if (inputElement) {
      inputElement.addEventListener('blur', () => this.onBlur());
      inputElement.addEventListener('focus', () => this.onFocus());
    }

    return fragment;
  }
}
