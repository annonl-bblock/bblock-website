import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';
import {NavigationPath} from "../core/navigation/common/navigation.interface";
import {HomeComponent} from "../home/home.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {LoginMenuComponent} from "./login.menu/login.menu.component";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {path: "", component: HomeComponent, pathMatch: 'full'},
        {path: NavigationPath.AuthorizationReg, component: RegistrationComponent, pathMatch: 'full'},
        {path: NavigationPath.AuthorizationLogin, component: LoginComponent, pathMatch: 'full'},
        {path: NavigationPath.AuthorizationLogout, component: LogoutComponent, pathMatch: 'full'}
      ]
    ),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [RegistrationComponent, LoginComponent, LogoutComponent,LoginMenuComponent],
  exports: [LoginMenuComponent]
})
export class AuthorizationModule { }
