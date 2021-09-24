import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomComponent } from './room/room.component';
import { RoomConfigComponent } from './room-config/room-config.component';
import { AddRoomComponent } from './add-room/add-room.component';

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
