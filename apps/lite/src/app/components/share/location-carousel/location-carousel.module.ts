import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCarouselComponent } from './location-carousel.component';
import { SwiperModule } from 'swiper/angular';
import { TuiIslandModule, TuiInputFilesModule } from '@taiga-ui/kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';

@NgModule({
  declarations: [LocationCarouselComponent],
  imports: [
    CommonModule,
    SwiperModule,
    TuiIslandModule,
    FontAwesomeModule,
    TuiInputFilesModule,
    FormsModule,
    LoadScreenModule,
  ],
  exports: [LocationCarouselComponent],
})
export class LocationCarouselModule {}
