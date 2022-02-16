import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstAccessComponent } from '@components/share/first-access/first-access/first-access.component';

const routes: Routes = [
  {
    path: '',
    component: FirstAccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstAccessRoutingModule {}
