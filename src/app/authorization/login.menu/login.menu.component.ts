import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthenticationService} from "../authorization.service";

@Component({
  selector: 'app-login-menu',
  templateUrl: './login.menu.component.html'
})
export class LoginMenuComponent implements OnInit {
  isAuthenticated?: "" | boolean | null;
  userName?: Observable<string | null | undefined>;
  panelOpenState = false;

  constructor(private authorizeService: AuthenticationService) { }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isUserAuthenticated();
    // this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }
}
