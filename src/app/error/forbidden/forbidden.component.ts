import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationPath} from "../../core/navigation/common/navigation.interface";

@Component({
  selector: 'app-error',
  templateUrl: './forbidden.component.html',
})
export class ForbiddenComponent implements OnInit {

  private returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "/";
  }

  public navigateToLogin = () => {
    this.router.navigate([NavigationPath.Authorization +"/"+ NavigationPath.AuthorizationLogin], {
      queryParams: {returnUrl: this.returnUrl}
    })
  }
}
