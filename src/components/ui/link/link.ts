import './link.scss';
import template from '@/components/ui/link/template';
import { Block } from '@/core/Block';
import Handlebars from 'handlebars';

export interface LinkProps extends Record<string, unknown> {
  href: string;
  dataPage?: string;
  isActive?: boolean;
  text: string;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', props);
  }

  override render(): DocumentFragment {
    const compiled = Handlebars.compile(template);
    return this.compile(compiled, this.props);
  }
}
