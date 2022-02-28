import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { ServerStreamService } from '@core/services/server-stream/server-stream.service';
import { SERVER_SYNCHRONIZATION } from './tokens/server-synchronization.token';
import { HeaderModule } from '@components/share/header/header.module';
import { ModalWindowModule } from '@components/share/modal-window/modal-window.module';

const deviceFactory = (serverStreamService: ServerStreamService) => {
  serverStreamService.subscribe({ api: 'devices' });
  return 'devices';
};

const locationFactory = (serverStreamService: ServerStreamService) => {
  serverStreamService.subscribe({
    api: 'locations',
    timeBetweenRequests: 6000,
  });
  return 'locations';
};

const profileFactory = (serverStreamService: ServerStreamService) => {
  serverStreamService.subscribe({
    api: 'profile',
  });
  return 'profile';
};

// const eventsFactory = (serverStreamService: ServerStreamService) => {
//   serverStreamService.subscribe({
//     api: 'events',
//   });
//   return 'events';
// };
@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    HeaderModule,
    ModalWindowModule,
  ],
  providers: [
    {
      provide: SERVER_SYNCHRONIZATION,
      useFactory: deviceFactory,
      deps: [ServerStreamService],
      multi: true,
    },
    {
      provide: SERVER_SYNCHRONIZATION,
      useFactory: locationFactory,
      deps: [ServerStreamService],
      multi: true,
    },
    {
      provide: SERVER_SYNCHRONIZATION,
      useFactory: profileFactory,
      deps: [ServerStreamService],
      multi: true,
    },
    // {
    //   provide: SERVER_SYNCHRONIZATION,
    //   useFactory: eventsFactory,
    //   deps: [ServerStreamService],
    //   multi: true,
    // },
  ],
})
export class MainLayoutModule {
  constructor(@Inject(SERVER_SYNCHRONIZATION) serverSynchronization: string[]) {
    console.warn('MainLayoutModule constructor');
  }
}
