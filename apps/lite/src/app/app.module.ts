import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_SANITIZER,
  TuiDialogModule,
  TuiModeModule,
  TuiNotificationsModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { ConfigService } from '@core/services/config/config.service';
import { environment } from '../environments/environment';
// import { TestComponent } from './components-old/test/test.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ApiModule } from '@core/services/api/api.module';

import { states } from '@store/index';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { EmptyLayoutModule } from './layouts/empty-layout/empty-layout.module';
import { DropDownModule } from '@modules/drop-down/drop-down.module';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { WebsocketModule } from '@core/services/websocket/websocket.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from '@components/share/login/login.component';

export const initApp = (configurationService: ConfigService) => () =>
  configurationService.load().toPromise();

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
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
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    ApiModule,
    MainLayoutModule,
    EmptyLayoutModule,
    DropDownModule,
    FontAwesomeModule,
    WebsocketModule.config({
      url: environment.ws,
    }),
    TuiRootModule,
    TuiNotificationsModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiDialogModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initApp,
    //   multi: true,
    //   deps: [ConfigService],
    // },
    // {
    //   provide: APP_BASE_HREF,
    //   useValue: '/lite',
    // },
    { provide: 'Window', useValue: window },
    DestroyService,
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
