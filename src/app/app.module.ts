import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialExampleModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from "./app.component";
import {NavMenuComponent} from "./nav-menu/nav-menu.component";
import {HomeComponent} from "./home/home.component";
import {OrderComponent} from "./order/order.component";
import {RoomComponent} from "./room/room.component";
import {RoomInfoComponent} from "./room/room.info.component";
import {BookingComponent} from "./booking/booking.component";
import {NotFoundComponent} from "./error/notfound/notfound.component";
import {CarouselModule} from "./ui/carousel/carousel.module";
import {NavigationPath} from "./core/navigation/common/navigation.interface";
import {BookingSearchComponent} from "./booking/booking.search.component";
import {RoomCardModule} from "./ui/room-card/room.card.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from "./authorization/shared/guards/auth.guard";
import {ForbiddenComponent} from "./error/forbidden/forbidden.component";
import {AuthorizationModule} from "./authorization/authorization.module";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    OrderComponent,
    RoomComponent,
    RoomInfoComponent,
    BookingComponent,
    NotFoundComponent,
    BookingSearchComponent,
    ForbiddenComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: "ng-cli-universal"}),
        HttpClientModule,
        FormsModule,
        MatExpansionModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MaterialExampleModule,
        MatFormFieldModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:5001"],
                disallowedRoutes: []
            }
        }),
        RouterModule.forRoot([
            {path: NavigationPath.Home, component: HomeComponent, pathMatch: "full"},
            {path: "orders", component: OrderComponent, canActivate: [AuthGuard]},
            {path: "rooms", component: RoomComponent},
            {path: "room/:id", component: RoomInfoComponent},
            {path: "booking", component: BookingComponent},
            {
                path: NavigationPath.Admin,
                loadChildren: (): Promise<any> => import("./admin-panel/admin-panel.module")
                    .then((modules => modules.AdminPanelModule)), canActivate: [AuthGuard]
            },
            {
                path: NavigationPath.Authorization,
                loadChildren: (): Promise<any> => import ("./authorization/authorization.module")
                    .then((module => module.AuthorizationModule))
            },
            {path: "forbidden", component: ForbiddenComponent},
            {path: "404", component: NotFoundComponent},
            {path: "**", redirectTo: "/404"},
        ]),
        CarouselModule,
        RoomCardModule,
        AuthorizationModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
