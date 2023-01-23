import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {IAuthRequest} from "../../core/objects/person.interface";
import {AuthenticationService} from "../authorization.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})

/*
Отображение формы авторизации и отправка
 */
export class LoginComponent implements OnInit {
  /*
  Логическая группа формы аутентификации. Созержит поля
   */
  loginForm: FormGroup;

  /*
  Url для обратного возвращения на страницу после аутентификации.
   */
  private returnUrl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private http: HttpClient,
              @Inject("BASE_URL") private baseUrl: string) {}

  /*
  Проверка правильности введения входного поля по названию.
   */
  validateControl(controlName: string) {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }

  /*
  Аутентификация на сервис.
   */
  login() {
    if (!this.loginForm.valid) {
      return;
    }

    let login: IAuthRequest = {
      email: this.loginForm.value.emailFormControl,
      password: this.loginForm.value.passwordFormControl
    };

    this.authService.loginUser(login).subscribe(result => {
      localStorage.setItem("token", result.token);
      this.authService.sendAuthStateChangeNotification(result.isAuthSuccessful);
      this.router.navigate([this.returnUrl]);
    })
  }

  /*
  Инициализация группы форм. Задание ограничений на поля.
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.pattern("")])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
