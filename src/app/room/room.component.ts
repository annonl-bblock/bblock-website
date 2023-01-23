import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {IRoomType, IRoomTypeAll} from "../core/objects/room.interface";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ['./room.component.css'],
})
export class RoomComponent {
  rooms: IRoomTypeAll[] = [];

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get<IRoomTypeAll[]>(baseUrl + "api/RoomTypes/all").subscribe(result => {
        this.rooms = result;
      },
      error => console.error(error));
  }
}
