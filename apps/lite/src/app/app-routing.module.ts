import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { AuthGuard } from '@core/services/auth/auth.guard';
import { LoginComponent } from '@components/share/login/login.component';

const isMobile = true;
const routes: Routes = [
  {
    path: 'login',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    loadChildren: () => {
      if (isMobile) {
        return import('./layouts/mobile-layout/mobile-layout.module').then(
          ({ MobileLayoutModule }) => MobileLayoutModule
        );
      }
      return import('./layouts/main-layout/main-layout.module').then(
        ({ MainLayoutModule }) => MainLayoutModule
      );
    },
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
