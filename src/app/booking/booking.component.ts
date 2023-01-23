import { Component, Inject } from "@angular/core";
import { HttpClient, HttpParams  } from "@angular/common/http";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/ru';
import {IRoomType} from "../core/objects/room.interface";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ['./booking.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class BookingComponent {
  filterDate = (d: Date | null): boolean => {
    const day = (d || new Date());

    return day >= new Date();

  };

  startDay: any;
  endDay: any;

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) { }

  currentCount = 1;
  currentCountChild = 0;

  isDisabledDec = true;
  isDisabledInc = false;
  isDisabledDecChild = true;
  isDisabledIncChild = false;

  increment() {
    this.currentCount++;
    this.checkCountGuests();
  }

  decrement() {
    this.currentCount--;
    this.checkCountGuests()
  }

  incrementChild() {
    this.currentCountChild++;
    this.checkCountGuests();
  }

  decrementChild() {
    this.currentCountChild--;
    this.checkCountGuests();
  }

  checkCountGuests() {
    this.isDisabledDec = this.currentCount === 1;
    this.isDisabledInc = this.currentCount + this.currentCountChild === 4;
    this.isDisabledIncChild = this.currentCountChild === 2 || this.isDisabledInc;
    this.isDisabledDecChild = this.currentCountChild === 0;
  }

  sendRequest() {
    let params = new HttpParams();
    params = params.append("startDay", this.startDay._i.year + "-" + (this.startDay._i.month + 1) + "-" + this.startDay._i.date);
    params = params.append("endDay", this.endDay._i.year + "-" + (this.endDay._i.month + 1) + "-" + this.endDay._i.date);
    params = params.append("guests", this.currentCount + this.currentCountChild);
    // params = params.append("price", 10000000);
    this.http.get<IRoomType[]>(this.baseUrl + "api/Bookings/q", {params: params}).subscribe(result =>
      {
        
      })
  }
}

