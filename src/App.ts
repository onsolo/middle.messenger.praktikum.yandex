import Handlebars from 'handlebars';

import ChevronRight from '@/components/icons/ChevronRight';
import ArrowLeft from '@/components/icons/ArrowLeft';
import ArrowRightCircle from '@/components/icons/ArrowRightCircle';

import { Block } from '@/core/Block';
import routes from '@/router/routes';
import PaperClip from '@/components/icons/PaperClip';
import StatusRead from '@/components/icons/StatusRead';
import Kebab from '@/components/icons/Kebab';

// Статичные иконки
Handlebars.registerPartial('ChevronRight', ChevronRight);
Handlebars.registerPartial('ArrowLeft', ArrowLeft);
Handlebars.registerPartial('ArrowRightCircle', ArrowRightCircle);
Handlebars.registerPartial('PaperClip', PaperClip);
Handlebars.registerPartial('StatusRead', StatusRead);
Handlebars.registerPartial('Kebab', Kebab);

// eslint-disable-next-line
type PageConstructor = new () => Block<any>;
export default class App {
  private appElement: HTMLElement | null;
  private routes: Record<string, PageConstructor> = {};
  constructor() {
    this.appElement = document.getElementById('app');
    this.initRoutes();

    if (this.appElement) {
      this.initEventListeners();
    }
  }

  public render(pageName: string) {
    const PageClass = this.routes[pageName];

    if (!PageClass) {
      console.error(`Route not found: ${pageName}`);
      this.render('404');
      return;
    }

    const pageComponent = new PageClass();

    if (this.appElement) {
      const content = pageComponent.getContent();
      if (content) {
        this.appElement.replaceChildren(content);
      }
    }

    pageComponent.dispatchComponentDidMount();
  }

  private initEventListeners() {
    this.appElement?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('[data-page]') as HTMLElement;

      if (link) {
        event.preventDefault();
        const { page } = link.dataset;

        if (page) {
          this.render(page);
        }
      }
    });
  }

  private initRoutes() {
    this.routes = routes;
  }

  initApp() {
    this.render('messenger');
  }
}
