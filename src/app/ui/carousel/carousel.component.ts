import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  @Input() set images(images: string[]) {
    this.slides = images;
    this.active = 0;
  }

  @Input("small") set small(value: string) {
    this.size = "50%";
    // this.sizeWidth = "50%"
  }
  @Output() selected = new EventEmitter<number>();

  size = "100%";
  // sizeWidth = "100%";
  active = 0;
  slides!: string[];
}
