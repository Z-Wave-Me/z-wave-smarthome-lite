import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from '@core/services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: EmptyLayoutComponent },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/main-layout/main-layout.module').then(({ MainLayoutModule }) => MainLayoutModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
