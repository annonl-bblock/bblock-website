import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';
import {NavigationPath} from "../core/navigation/common/navigation.interface";
import {
  AdminRoomAddDialogComponent,
  AdminRoomComponent, AdminRoomDeletePanelComponent, AdminRoomUpdateDialogComponent,
} from "./components/room/admin-room.component";
import {AdminPanelComponent} from "./admin-panel.component";
import {AdminMenuComponent} from "./components/admin-menu/admin-menu.component";
import {
  AdminRoomTypeAddComponent,
  AdminRoomTypeComponent,
  AdminRoomTypeDeleteComponent, AdminRoomTypeShowComponent, AdminRoomTypeUpdateComponent
} from "./components/typeRoom/admin-type-room.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "../authorization/shared/guards/auth.guard";
import {AuthAdminGuard} from "../authorization/shared/guards/auth.admin.guard";
import {
  AdminPersonAddComponent,
  AdminPersonComponent,
  AdminPersonDeleteComponent, AdminPersonUpdateComponent
} from "./components/person/admin.person.component";
import {
  AdminBookingAddComponent,
  AdminBookingComponent,
  AdminBookingDeleteComponent, AdminBookingUpdateComponent
} from "./components/booking/admin.booking.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {path: "", component: AdminPanelComponent, pathMatch: 'full', canActivate: [AuthGuard, AuthAdminGuard]},
        {
          path: NavigationPath.AdminRoom,
          component: AdminRoomComponent,
          pathMatch: 'full',
          canActivate: [AuthGuard, AuthAdminGuard]
        },
        {
          path: NavigationPath.AdminTypeRoom,
          component: AdminRoomTypeComponent,
          pathMatch: 'full',
          canActivate: [AuthGuard, AuthAdminGuard]
        },
        {
        path: NavigationPath.AdminPerson,
        component: AdminPersonComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard, AuthAdminGuard]
        },
        {
          path: NavigationPath.AdminBooking,
          component: AdminBookingComponent,
          pathMatch: 'full',
          canActivate: [AuthGuard, AuthAdminGuard]
        },
        // { path: NavigationPath.AdminBooking, component:  },
        // { path: NavigationPath.AdminPerson, component:  },
        // { path: NavigationPath.AdminDiscount, component:  }
      ]
    ),
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    AdminMenuComponent,
    AdminRoomComponent,
    AdminRoomTypeComponent,
    AdminPanelComponent,
    AdminRoomAddDialogComponent,
    AdminRoomDeletePanelComponent,
    AdminRoomUpdateDialogComponent,
    AdminRoomTypeDeleteComponent,
    AdminRoomTypeAddComponent,
    AdminRoomTypeUpdateComponent,
    AdminBookingComponent,
    AdminPersonComponent,
    AdminPersonDeleteComponent,
    AdminPersonAddComponent,
    AdminPersonUpdateComponent,
    AdminBookingDeleteComponent,
    AdminBookingAddComponent,
    AdminBookingUpdateComponent,
    AdminRoomTypeShowComponent
  ],
  exports: [AdminPanelComponent, AdminRoomComponent]
})
export class AdminPanelModule {
}
