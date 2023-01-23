import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";
import {Inject, Injectable} from "@angular/core";
import {IAuthRequest, IAuthResponse} from "../core/objects/person.interface";

@Injectable({
  providedIn: 'root'
})
/*
Сервис для посылания запросов авторизации, аутентификации, регистрации.
 */
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, @Inject("BASE_URL") private baseUrl: string) {
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  /*
  Проверка авторизованности пользователя.
   */
  public isUserAuthenticated = (): "" | boolean | null => {

    let token: string = localStorage.getItem("token")!;
    console.log(this.jwtHelper.decodeToken(token));
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public isUserAdministrator() {
    let token: string = localStorage.getItem("token")!;

    return token &&
      this.jwtHelper.decodeToken(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Administrator";
  }

  /*
  Отправка запроса на сервер для аутентификацию.
   */
  public loginUser(body: IAuthRequest) {
    return this.http.post<IAuthResponse>(this.baseUrl + "api/authorization/login", body);
  }

  /*
  Удаление токена аутентификации.
   */
  public logoutUser() {
    localStorage.removeItem("token");

    return true;
  }
}
