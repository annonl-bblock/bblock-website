import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {IRoomTypeAll} from "../../core/objects/room.interface";

@Component({
  selector: 'app-room-card',
  templateUrl: './room.card.component.html',
  styleUrls: ['./room.card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  @Input() set room(room: IRoomTypeAll[]) {
    this.rooms = room;
  }
  @Output() selected = new EventEmitter<number>();

  setActiveCard(numberCard: number) {
    this.activeCard = numberCard;
  }

  activeCard = -1;
  rooms: IRoomTypeAll[];
}
