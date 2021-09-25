import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { EmptyLayoutComponent } from '../empty-layout/empty-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: MobileLayoutComponent,
    children: [
      {
        path: 'elements',
        loadChildren: () =>
          import('@components/share/elements/elements.module').then(
            ({ ElementsModule }) => ElementsModule
          ),
        data: { animation: '/elements' },
      },
      {
        path: 'personal-settings',
        loadChildren: () =>
          import(
            '@components/share/personal-settings/personal-settings.module'
          ).then(({ PersonalSettingsModule }) => PersonalSettingsModule),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('@components/share/rooms/rooms.module').then(
            ({ RoomsModule }) => RoomsModule
          ),
        data: { animation: '/rooms' },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@components/share/dashboard/dashboard.module').then(
            ({ DashboardModule }) => DashboardModule
          ),
        data: { animation: '/dashboard' },
      },
      {
        path: 'events',
        loadChildren: () =>
          import('@components/share/events/events.module').then(
            ({ EventsModule }) => EventsModule
          ),
        data: { animation: '/events' },
      },
      {
        path: 'automations',
        loadChildren: () =>
          import('@components/share/automations/automations.module').then(
            ({ AutomationsModule }) => AutomationsModule
          ),
        data: { animation: '/automations' },
      },
    ],
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: 'element',
        loadChildren: () =>
          import(
            '@components/mobile/mobile-element-control-module/mobile-element-control-module.module'
          ).then(
            ({ MobileElementControlModuleModule }) =>
              MobileElementControlModuleModule
          ),
        data: { animation: 'element' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileLayoutRoutingModule {}
