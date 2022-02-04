import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // children: [
    //   {
    //     path: 'elements',
    //     loadChildren: () =>
    //       import('../../components-old/elements/elements.module').then(
    //         ({ ElementsModule }) => ElementsModule
    //       ),
    //     data: { animation: 'elements' },
    //   },
    //   {
    //     path: 'personal-settings',
    //     loadChildren: () =>
    //       import(
    //         '../../components-old/personal-settings/personal-settings.module'
    //       ).then(({ PersonalSettingsModule }) => PersonalSettingsModule),
    //   },
    //   {
    //     path: 'rooms',
    //     loadChildren: () =>
    //       import('../../components-old/rooms/rooms.module').then(
    //         ({ RoomsModule }) => RoomsModule
    //       ),
    //     data: { animation: 'rooms' },
    //   },
    //   {
    //     path: 'dashboard',
    //     loadChildren: () =>
    //       import('../../components-old/dashboard/dashboard.module').then(
    //         ({ DashboardModule }) => DashboardModule
    //       ),
    //     data: { animation: 'dashboard' },
    //   },
    //   {
    //     path: 'control',
    //     loadChildren: () =>
    //       import(
    //         '../../components-old/element-control/element-control.module'
    //       ).then(({ ElementControlModule }) => ElementControlModule),
    //     data: { animation: 'control' },
    //   },
    //   {
    //     path: 'devices',
    //     loadChildren: () =>
    //       import('../../components-old/devices/devices.module').then(
    //         ({ DevicesModule }) => DevicesModule
    //       ),
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'dashboard',
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
