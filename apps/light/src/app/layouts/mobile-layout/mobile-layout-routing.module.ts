import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MobileLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileLayoutRoutingModule {}
