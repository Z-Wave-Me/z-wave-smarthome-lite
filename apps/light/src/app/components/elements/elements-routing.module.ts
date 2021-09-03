import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementsComponent } from '@components/elements/elements.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsComponent,
  },
  // {
  //   path: ':id',
  //   loadChildren: () =>
  //     import('./element-config/element-config.module').then(({ ElementConfigModule }) => ElementConfigModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementsRoutingModule {}
