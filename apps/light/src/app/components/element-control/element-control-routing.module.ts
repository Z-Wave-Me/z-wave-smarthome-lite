import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementControlComponent } from '@components/element-control/element-control.component';

const routes: Routes = [{ path: ':id', component: ElementControlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementControlRoutingModule {}
