import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomConfigComponent } from '@components/share/room-config/room-config.component';
import { RoomConfigGuard } from '@core/guards/room-config/room-config.guard';

const routes: Routes = [
  {
    path: ':id',
    component: RoomConfigComponent,
    canActivate: [RoomConfigGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomConfigRoutingModule {}
