import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomComponent } from '../rooms/room/room.component';
import { RoomConfigComponent } from '../rooms/room-config/room-config.component';
import { AddRoomComponent } from '../rooms/add-room/add-room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
  },
  {
    path: 'new',
    component: AddRoomComponent,
  },
  {
    path: 'config',
    children: [
      {
        path: ':id',
        component: RoomConfigComponent,
      },
    ],
  },
  {
    path: ':id',
    component: RoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
