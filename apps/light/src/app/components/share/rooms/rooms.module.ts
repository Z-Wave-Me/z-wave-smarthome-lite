import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomListComponent } from './room-list/room-list.component';

@NgModule({
  declarations: [RoomListComponent],
  imports: [CommonModule, RoomsRoutingModule],
})
export class RoomsModule {}
