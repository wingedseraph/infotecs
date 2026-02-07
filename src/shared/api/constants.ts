export const AUTH_MESSAGE = {
  INVALID_CREDENTIAL: 'Неверный логин или пароль',
} as const;

export const USER_RESPONSE_MESSAGE = {
  SUCCESSFUL_CREATED: 'Пользователь успешно создан',
  SUCCESSFUL_UPDATED: 'Пользователь успешно обновлен',
  SUCCESSFUL_DELETED: 'Пользователь успешно удален',

  FAILED_CREATED: 'Ошибка при создании пользователя:',
  FAILED_UPDATED: 'Ошибка при обновлении пользователя:',
  FAILED_DELETED: 'Ошибка при удалении пользователя:',
};

export const GENERIC_RESPONSE_MESSAGE = {
  WRONG_API_DATA: 'Некорректные данные с API',
  SOMETHING_WENT_WRONG: 'Что-то пошло не так',
};
