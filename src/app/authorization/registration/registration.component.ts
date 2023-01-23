import {Component, Inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authorization.service";
import {IAuthRequest} from "../../core/objects/person.interface";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ["./registration.component.css"]
})

export class RegistrationComponent {
  /*
    Логическая группа формы аутентификации. Созержит поля
     */
  registrationGroup: FormGroup;

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
    return this.registrationGroup.get(controlName)?.invalid && this.registrationGroup.get(controlName)?.touched;
  }

  /*
  Аутентификация на сервис.
   */
  registration() {
    if (!this.registrationGroup.valid) {
      return;
    }

    if (this.registrationGroup.value.passwordFormControl != this.registrationGroup.value.confirmPasswordFormControl) {
      return;
    }

    let login: IAuthRequest = {
      email: this.registrationGroup.value.emailFormControl,
      password: this.registrationGroup.value.passwordFormControl
    };

    let reg = {
      "Email": this.registrationGroup.value.emailFormControl,
      "Password": this.registrationGroup.value.passwordFormControl,
      "ConfirmPassword": this.registrationGroup.value.confirmPasswordFormControl
    }

    console.log(reg);
    this.http.post(this.baseUrl + "api/authorization/registration", login).subscribe( result => {
      this.authService.loginUser(login).subscribe(result => {
        localStorage.setItem("token", result.token);
        this.authService.sendAuthStateChangeNotification(result.isAuthSuccessful);
        this.router.navigate([this.returnUrl]);
      })
    })
  }

  /*
  Инициализация группы форм. Задание ограничений на поля.
   */
  ngOnInit(): void {
    this.registrationGroup = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.pattern("")]),
      confirmPasswordFormControl: new FormControl('', [Validators.required])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
