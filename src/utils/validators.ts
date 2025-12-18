export enum ValidateRuleType {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Name = 'name',
  Phone = 'phone',
  Message = 'message',
}

const REGEX = {
  [ValidateRuleType.Login]: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
  [ValidateRuleType.Password]: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  [ValidateRuleType.Email]: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
  [ValidateRuleType.Name]: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
  [ValidateRuleType.Phone]: /^\+?\d{10,15}$/,
  [ValidateRuleType.Message]: /^.+$/s,
};

const ERROR_MESSAGES = {
  [ValidateRuleType.Login]: 'От 3 до 20 символов, латиница, без пробелов, не только цифры.',
  [ValidateRuleType.Password]: 'От 8 до 40 символов, обязательно одна заглавная буква и цифра.',
  [ValidateRuleType.Email]: 'Некорректный email (обязательно @ и точка, латиница).',
  [ValidateRuleType.Name]: 'С заглавной буквы, без пробелов и цифр, латиница или кириллица.',
  [ValidateRuleType.Phone]: 'От 10 до 15 символов, только цифры, может начинаться с плюса.',
  [ValidateRuleType.Message]: 'Сообщение не может быть пустым.',
};

export function validate(type: ValidateRuleType, value: string): string {
  if (value.length === 0) {
    return 'Поле не может быть пустым';
  }

  const regex = REGEX[type];
  if (regex && !regex.test(value)) {
    return ERROR_MESSAGES[type];
  }

  return '';
}
