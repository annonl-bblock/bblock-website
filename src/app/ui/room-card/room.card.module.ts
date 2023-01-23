import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {RoomCardComponent} from "./room.card.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CarouselModule} from "../carousel/carousel.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatFormFieldModule, CarouselModule, MatCardModule, MatButtonModule],
  declarations: [RoomCardComponent],
  exports: [RoomCardComponent],
})
export class RoomCardModule { }
