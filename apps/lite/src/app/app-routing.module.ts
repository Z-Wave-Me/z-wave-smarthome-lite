import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { LoginComponent } from '@components/share/login/login.component';
import { FirstAccessModule } from '@components/share/first-access/first-access.module';
import { FirstAccessGuard } from '@core/guards/first-access/first-access.guard';
import { AlreadyAuthorizedGuard } from '@core/guards/already-authorized/already-authorized.guard';

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
    canActivate: [AlreadyAuthorizedGuard],
  },
  {
    path: 'firstAccess',
    loadChildren: () =>
      import('./components/share/first-access/first-access.module').then(
        ({ FirstAccessModule }) => FirstAccessModule
      ),
    canActivate: [FirstAccessGuard],
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
