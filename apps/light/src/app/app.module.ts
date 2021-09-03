import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getActionTypeFromInstance, NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { ConfigService } from '@core/services/config/config.service';
import { environment } from '../environments/environment';
import { TestComponent } from '@components/test/test.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ApiModule } from '@core/services/api/api.module';

import { states } from '@store/index';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { EmptyLayoutModule } from './layouts/empty-layout/empty-layout.module';
import { APP_BASE_HREF } from '@angular/common';
import { DropDownModule } from '@modules/drop-down/drop-down.module';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogModule } from '@modules/dialog/dialog.module';
import { WebsocketModule } from '@core/services/websocket/websocket.module';

export const initApp = (configurationService: ConfigService) => () => configurationService.load().toPromise();

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [LocalStorageState],
    }),
    environment.production
      ? []
      : [
          NgxsReduxDevtoolsPluginModule.forRoot(),
          NgxsLoggerPluginModule.forRoot({
            filter: (action: any) => {
              // return getActionTypeFromInstance(action)?.includes('[Devices]') ?? false;
              return false;
            },
          }),
        ],
    NgxsResetPluginModule.forRoot(),
    HttpClientModule,
    ApiModule,
    TranslocoRootModule,
    MainLayoutModule,
    EmptyLayoutModule,
    DropDownModule,
    // FontAwesomeModule,
    MatSnackBarModule,
    DialogModule,
    WebsocketModule.config({
      url: environment.ws,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigService],
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/light',
    },
    // {
    //   provide: LOGGER,
    //   useValue: { log: 'mockLogger'},
    // }
    DestroyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
