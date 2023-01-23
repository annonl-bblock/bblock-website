import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Component({
  selector: "app-room-info",
  templateUrl: "./room.info.component.html",
  styleUrls: ["./room.info.component.css"],
})
export class RoomInfoComponent {
  room: IRoom;
  id: any;
  images: string[];


  constructor(http: HttpClient,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    @Inject("BASE_URL") baseUrl: string) {

    this.id = this.activatedRoute.snapshot.params?.id;

    http.get<IRoom>(baseUrl + "api/RoomTypes/" + this.id).subscribe(
      result => {
        this.room = result;
        this.images = result.images;
      },
      error => {
        if (error.status === 404) {
          this.router.navigate(["/404"]);
        }
      });
  }
}

interface IRoom {
  id: string;
  name: string;
  images: string[];
}
