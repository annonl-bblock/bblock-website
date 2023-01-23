/*
Ответ от сервиса аутентификации.
 */
export interface IAuthResponse {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}

/*
Запрос на сервер аутентификации.
 */
export interface IAuthRequest {
  email: string;
  password: string;
}
