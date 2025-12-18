import store from '@/core/Store';
import { currentUser } from '@/mockData';

class AuthController {
  public fetchUser() {
    store.set('user', currentUser);
  }

  public signIn(data: Record<string, string>) {
    console.log('Авторизация пользователя', data);
  }

  public signUp(data: Record<string, string>) {
    console.log('Регистрация пользователя', data);
  }
}

export default new AuthController();
