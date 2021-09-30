import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomConfigComponent } from '@components/share/room-config/room-config.component';

const routes: Routes = [
  {
    path: ':id',
    component: RoomConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomConfigRoutingModule {}
