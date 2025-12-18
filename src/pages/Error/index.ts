import './error-page.scss';
import ErrorPage from '@/pages/Error/errorPage';

export class Page404 extends ErrorPage {
  constructor() {
    super({ title: '404', subtitle: 'Не туда попали' });
  }
}

export class Page500 extends ErrorPage {
  constructor() {
    super({ title: '500', subtitle: 'Мы уже фиксим' });
  }
}
