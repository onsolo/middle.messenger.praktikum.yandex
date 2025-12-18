import './back-link.scss';
import { Block } from '@/core/Block';
import Handlebars from 'handlebars';
import template from '@/components/features/BackLink/template';

export interface BackLinkProps extends Record<string, unknown> {
  href: string;
  dataPage: string;
}

export default class BackLink extends Block<BackLinkProps> {
  constructor(props: BackLinkProps) {
    super('a', props);
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
