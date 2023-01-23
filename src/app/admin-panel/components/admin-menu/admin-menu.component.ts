import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavigationLink, NavigationPath} from "../../../core/navigation/common/navigation.interface"

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenuComponent implements OnInit {

  ngOnInit(): void {
  }

  links: NavigationLink[]
  constructor() {
    this.links = [
      {
        route: NavigationPath.AdminTypeRoom,
        label: "Типы комнат"
      },
      {
        route: NavigationPath.AdminRoom,
        label: "Комнаты"
      },
      {
        route: NavigationPath.AdminPerson,
        label: "Посетители"
      },
      {
        route: NavigationPath.AdminBooking,
        label: "Бронирование"
      },
    ]


  }

}
