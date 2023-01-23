import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRoom, IRoomType} from "../../../core/objects/room.interface";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css'],
})
export class AdminRoomComponent {
  rooms: IRoom[];
  typesRoom: IRoomType[];

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string, private dialog: MatDialog) {
    http.get<IRoomType[]>(baseUrl + "api/RoomTypes").subscribe(result => {
        this.typesRoom = result;
      },
      error => console.error(error));

    this.getRooms();

  }

  getRooms() {
    this.http.get<IRoom[]>(this.baseUrl + "api/Rooms").subscribe(result => {
        this.rooms = result;

      },
      error => console.error(error));
  }

  openDeleteDialog(room: IRoom) {
    const dialogRef = this.dialog.open(AdminRoomDeletePanelComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.http.delete(this.baseUrl + "api/Rooms/" + room.id).subscribe(result => {
        this.getRooms();
      });
    });

  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(AdminRoomAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.http.post(this.baseUrl + "api/Rooms", result).subscribe( result => {
        this.getRooms();
      })
    });
  }

  openUpdateDialog(room: IRoom) {
    const dialogRef = this.dialog.open(AdminRoomUpdateDialogComponent, {
      data: {
        "id": room.id,
        "roomTypeId": room.type,
        "floor": room.floor,
        "number": room.number
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.http.put(this.baseUrl + "api/Rooms", result).subscribe( result => {
        this.getRooms();
      })
    });
  }
}

@Component({
  selector: 'add-room-dialog',
  templateUrl: 'admin-room.addPanel.html',
})
export class AdminRoomAddDialogComponent {

  typeRoomId: string;
  floor: number;
  numberRoom: number;

  typesRoom: IRoomType[];
  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    http.get<IRoomType[]>(baseUrl + "api/RoomTypes").subscribe(result => {
        this.typesRoom = result;
      },
      error => console.error(error));

  }
  returnValue() {
    return {
      "roomTypeId": this.typeRoomId,
      "floor": this.floor,
      "number": this.numberRoom
    }
  }
}

@Component({
  selector: 'delete-room-dialog',
  templateUrl: 'admin-room.deletePanel.html',
})
export class AdminRoomDeletePanelComponent { }


@Component({
  selector: 'update-room-dialog',
  templateUrl: 'admin-room.updatePanel.html',
})
export class AdminRoomUpdateDialogComponent {

  typeRoomId: string;
  floor: number;
  numberRoom: number;
  typesRoom: IRoomType[];

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string, @Inject(MAT_DIALOG_DATA) public data: any) {
    http.get<IRoomType[]>(baseUrl + "api/RoomTypes").subscribe(result => {
        this.typesRoom = result;
        debugger;
        this.typeRoomId = this.typesRoom.find(item => item.id === data.roomTypeId.id)!.id;
        this.floor = data.floor;
        this.numberRoom = data.number;
      },
      error => console.error(error));
  }
  returnValue() {
    return {
      "id": this.data.id,
      "roomTypeId": this.typeRoomId,
      "floor": this.floor,
      "number": this.numberRoom
    }
  }
}
