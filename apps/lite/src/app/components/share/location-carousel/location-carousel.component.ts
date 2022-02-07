import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  faCalendar as faCamera,
  faStar as faTrash,
} from '@fortawesome/free-regular-svg-icons';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';

SwiperCore.use([EffectCoverflow, Pagination]);

@Component({
  selector: 'z-wave-location-carousel',
  templateUrl: './location-carousel.component.html',
  styleUrls: ['./location-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LocationCarouselComponent implements OnInit {
  list: string[] = [];
  @Output() readonly upload = new EventEmitter<File>();
  @Output() readonly selectImg = new EventEmitter<
    { url?: string; default: boolean } | undefined
  >();
  @Output() readonly removeCustom = new EventEmitter<void>();
  faCamera = faCamera;
  faTrash = faTrash;
  selected?: number;
  initial = 0;
  defaultImages = [
    'kitchen.jpg',
    'bathroom.jpg',
    'sleeping_room.jpg',
    'living_room.jpg',
  ].map((img) => 'assets/img/rooms/' + img);
  uploading = false;

  private _customImg?: string;

  get customImg(): string | undefined {
    return this._customImg;
  }

  @Input() set customImg(img: string | undefined) {
    this.list = [...this.defaultImages];
    if (img) {
      this._customImg = '/ZAutomation/api/v1/load/image/' + img;
      this.list.push(this._customImg);
    } else {
      this._customImg = undefined;
    }
  }

  @Input() set current(url: string | undefined) {
    if (url) {
      this.selected = this.list.indexOf(url);
      if (this.selected && this.selected < 0) {
        this.selected = undefined;
      }
    }
  }

  onTap(index: number) {
    this.selected = this.selected === index ? undefined : index;
    this.selectImg.emit(
      this.selected !== undefined
        ? {
            url: this.list[this.selected].split('/').pop(),
            default: this.defaultImages.includes(this.list[this.selected]),
          }
        : undefined
    );
  }

  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.upload.emit(file);
      const reader = new FileReader();
      this.uploading = true;
      reader.onload = () => {
        this.uploading = false;
        this._customImg = reader.result as string;
        this.list.push(this._customImg);
      };
      reader.readAsDataURL(file);
    }
  }

  clearCustomImg() {
    this.removeCustom.emit();
  }

  ngOnInit(): void {
    this.initial = this.selected ?? 0;
  }
}
