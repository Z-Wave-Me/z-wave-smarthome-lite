import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementControlComponent } from '@components/mobile/mobile-element-control-module/element-control/element-control.component';

const routes: Routes = [
  {
    path: ':id',
    component: ElementControlComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileElementControlModuleRoutingModule {}
