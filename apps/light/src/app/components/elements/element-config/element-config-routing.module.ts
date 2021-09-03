import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementConfigComponent } from '@components/elements/element-config/element-config.component';

const routes: Routes = [
  {
    path: ':id',
    component: ElementConfigComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementConfigRoutingModule {}
