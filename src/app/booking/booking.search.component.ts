import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'moment/locale/ru';
import {ActivatedRoute, Router} from "@angular/router";
import {IRoomType} from "../core/objects/room.interface";

@Component({
  selector: "app-booking-search",
  templateUrl: "./booking.search.component.html",
  styleUrls: ['./booking.component.css'],
})
export class BookingSearchComponent {

  rooms: IRoomType[];

  constructor(http: HttpClient,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              @Inject("BASE_URL") baseUrl: string) {

  }
}


