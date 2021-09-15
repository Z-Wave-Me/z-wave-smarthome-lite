import { Component, Inject, OnInit } from '@angular/core';
import { ServerStreamService } from '@core/services/server-stream/server-stream.service';
import { SERVER_SYNCHRONIZATION } from '../../main-layout/tokens/server-synchronization.token';

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

@Component({
  selector: 'z-wave-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.scss'],
  providers: [
    ServerStreamService,
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
  ],
})
export class MobileLayoutComponent {
  constructor(
    @Inject(SERVER_SYNCHRONIZATION) serverSynchronization: string[]
  ) {}
}
