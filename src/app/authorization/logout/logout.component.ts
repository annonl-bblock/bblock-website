import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../authorization.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})

/*
Выход из системы.
 */
export class LogoutComponent {

  constructor(private authService: AuthenticationService) {
    authService.logoutUser();
    window.location.reload();
  }
}
