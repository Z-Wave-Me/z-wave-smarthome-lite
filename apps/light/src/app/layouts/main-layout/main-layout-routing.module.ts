import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'elements',
        loadChildren: () => import('@components/elements/elements.module').then(({ ElementsModule }) => ElementsModule),
        data: { animation: 'elements' },
      },
      {
        path: 'element',
        loadChildren: () =>
          import('@components/elements/element-config/element-config.module').then(
            ({ ElementConfigModule }) => ElementConfigModule,
          ),
        data: { animation: 'element' },
      },
      {
        path: 'personal-settings',
        loadChildren: () =>
          import('@components/personal-settings/personal-settings.module').then(
            ({ PersonalSettingsModule }) => PersonalSettingsModule,
          ),
      },
      {
        path: 'rooms',
        loadChildren: () => import('@components/rooms/rooms.module').then(({ RoomsModule }) => RoomsModule),
        data: { animation: 'rooms' },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@components/dashboard/dashboard.module').then(({ DashboardModule }) => DashboardModule),
        data: { animation: 'dashboard' },
      },
      {
        path: 'control',
        loadChildren: () =>
          import('@components/element-control/element-control.module').then(
            ({ ElementControlModule }) => ElementControlModule,
          ),
        data: { animation: 'control' },
      },
      {
        path: 'devices',
        loadChildren: () => import('@components/devices/devices.module').then(({ DevicesModule }) => DevicesModule),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
