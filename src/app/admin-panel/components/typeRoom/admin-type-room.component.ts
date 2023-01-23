import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRoomType, IRoomTypeAll} from "../../../core/objects/room.interface";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-room-type',
  templateUrl: './admin-type-room.component.html',
  styleUrls: ['./admin-type-room.component.css'],
})
export class AdminRoomTypeComponent {
  typesRoom: IRoomTypeAll[];

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string, private dialog: MatDialog) {
    this.getTypesRooms();

  }

  getTypesRooms() {
    this.http.get<IRoomTypeAll[]>(this.baseUrl + "api/RoomTypes/all").subscribe(result => {
        this.typesRoom = result;
      },
      error => console.error(error));
  }

  openDeleteDialog(room: IRoomTypeAll) {
    const dialogRef = this.dialog.open(AdminRoomTypeDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.http.delete(this.baseUrl + "api/RoomTypes/" + room.id).subscribe(result => {
        this.getTypesRooms();
      });
    });

  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(AdminRoomTypeAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.http.post(this.baseUrl + "api/RoomTypes", result).subscribe( result => {
        this.getTypesRooms();
      })
    });
  }

  openShowDialog(room: IRoomTypeAll) {
    const dialogRef = this.dialog.open(AdminRoomTypeShowComponent, {
      data: {
        "id": room.id,
        "name": room.name,
        "description": room.description,
        "capacity": room.capacity,
        "square": room.square,
        "price": room.price,
        "images": room.images
      }
    });
  }

  openUpdateDialog(room: IRoomTypeAll) {
    const dialogRef = this.dialog.open(AdminRoomTypeUpdateComponent, {
      data: {
        "id": room.id,
        "name": room.name,
        "description": room.description,
        "capacity": room.capacity,
        "square": room.square,
        "price": room.price,
        "images": room.images
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.http.put(this.baseUrl + "api/RoomTypes", result).subscribe( result => {
        this.getTypesRooms();
      })
    });
  }
}

@Component({
  selector: 'app-admin-room-type-delete',
  templateUrl: './admin-type-room-deleteDialog.html'
})
export class AdminRoomTypeDeleteComponent {}


@Component({
  selector: 'app-admin-room-type-add',
  templateUrl: 'admin-type-room-addDialog.html'
})
export class AdminRoomTypeAddComponent {
  name: string;
  description: string;
  capacity: number;
  square: number;
  price: number;
  imagesString: string;
  images: string[] = [];

  returnValue() {
    let images: string[] = []
    let result = {
        "name": this.name,
        "description": this.description,
        "capacity": this.capacity,
        "square": this.square,
        "price": this.price,
        "images": images
      };

    result.images.push(this.imagesString);
    console.log(result);
    return result;
  }
}

@Component({
  selector: 'app-admin-room-type-update',
  templateUrl: 'admin-type-room-updateDialog.html'
})
export class AdminRoomTypeUpdateComponent {
  name: string;
  description: string;
  capacity: number;
  square: number;
  price: number;
  images: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.name;
    this.description = data.description;
    this.capacity = data.capacity;
    this.square = data.square;
    this.price = data.price;
    this.images = data.images;
  }

  returnValue() {
    let images: string[] = []
    let result =  {
      "id": this.data.id,
      "name": this.name,
      "description": this.description,
      "capacity": this.capacity,
      "square": this.square,
      "price": this.price,
      "images": images
    };

    result.images = this.images;

    return result;
  }
}

@Component({
  selector: 'app-admin-room-type-show',
  templateUrl: 'admin-type-room-showDialog.html'
})
export class AdminRoomTypeShowComponent {
  name: string;
  description: string;
  capacity: number;
  square: number;
  price: number;
  images: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.name;
    this.description = data.description;
    this.capacity = data.capacity;
    this.square = data.square;
    this.price = data.price;
    this.images = data.images;
  }


}
