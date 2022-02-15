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
    data: { animation: 'mobile' },
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
      },
      {
        path: 'rooms',
        component: EmptyLayoutComponent,
        children: [
          {
            path: 'config',
            loadChildren: () =>
              import('@components/share/room-config/room-config.module').then(
                ({ RoomConfigModule }) => RoomConfigModule
              ),
          },
        ],
      },
      {
        path: 'settings',
        component: EmptyLayoutComponent,
        loadChildren: () =>
          import(
            '@components/mobile/personal-settings/personal-settings.module'
          ).then(({ PersonalSettingsModule }) => PersonalSettingsModule),
      },
    ],
    data: { animation: 'empty' },
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
