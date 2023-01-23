import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRoomType, IRoomTypeAll} from "../../../core/objects/room.interface";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-person',
  templateUrl: './admin.person.component.html',
  styleUrls: ['./admin.person.component.css'],
})
export class AdminPersonComponent {
  guests: IRoomTypeAll[];
  admins: IRoomTypeAll[];

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string, private dialog: MatDialog) {
    this.getGuests();

  }

  getGuests() {
    this.http.get<IRoomTypeAll[]>(this.baseUrl + "api/User/guests").subscribe(result => {
        this.guests = result;
      },
      error => console.error(error));
  }

  openDeleteDialog(room: IRoomTypeAll) {
    const dialogRef = this.dialog.open(AdminPersonDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.http.delete(this.baseUrl + "api/RoomTypes/" + room.id).subscribe(result => {
        this.getGuests();
      });
    });

  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(AdminPersonAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.http.post(this.baseUrl + "api/RoomTypes", result).subscribe( result => {
        this.getGuests();
      })
    });
  }

  openUpdateDialog(room: IRoomTypeAll) {
    const dialogRef = this.dialog.open(AdminPersonUpdateComponent, {
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
        this.getGuests();
      })
    });
  }
}

@Component({
  selector: 'app-admin-person-delete',
  templateUrl: './admin.person-deleteDialog.html'
})
export class AdminPersonDeleteComponent {}


@Component({
  selector: 'app-admin-person-add',
  templateUrl: 'admin.person-addDialog.html'
})
export class AdminPersonAddComponent {
  name: string;
  description: string;
  capacity: number;
  square: number;
  price: number;
  imagesString: string;
  images: string[];

  returnValue() {
    let result = {
        "name": this.name,
        "description": this.description,
        "capacity": this.capacity,
        "square": this.square,
        "price": this.price,
        "images": this.images
      };

    const images: string[] = [];
debugger;
    for (let image in this.imagesString.split("\n")) {
      images.push(image);
    }

    console.log(images);
    result.images = images;
    console.log(result);
    return result;
  }
}

@Component({
  selector: 'app-admin-person-update',
  templateUrl: 'admin.person-updateDialog.html'
})
export class AdminPersonUpdateComponent {
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
    let result =  {
      "name": this.name,
      "description": this.description,
      "capacity": this.capacity,
      "square": this.square,
      "price": this.price,
      "images": []
    };

// todo: Узнать, как сделать передачу в массиве.
    for (let image in this.images) {

    }

    return result;
  }
}
