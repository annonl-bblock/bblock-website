import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-fetch-data",
  templateUrl: "./order.component.html"
})
export class OrderComponent {
  bookings: IBooking[] = [];

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get<IBooking[]>(baseUrl + "api/Bookings").subscribe(result => {
        this.bookings = result;
      },
      error => console.error(error));
  }
}

interface IBooking {
  id: string;
  roomId: string;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
}
