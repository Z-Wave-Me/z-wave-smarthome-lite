import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiHintControllerModule,
  TuiModeModule,
  TuiNotificationModule,
  TuiNotificationsModule,
  TuiRootModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
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
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ApiModule } from '@core/services/api/api.module';

import { states } from '@store/index';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyLayoutModule } from './layouts/empty-layout/empty-layout.module';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { WebsocketModule } from '@core/services/websocket/websocket.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from '@components/share/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiFieldErrorModule,
  TuiFieldErrorPipeModule,
  TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import {
  TuiLetModule,
  TuiOverscrollModule,
  TuiValidatorModule,
} from '@taiga-ui/cdk';
import { BackgroundModeService } from '@core/services/background-mode/background-mode.service';

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
              return (
                // getActionTypeFromInstance(action)?.includes('[Devices]') ??
                false
              );
              return false;
            },
          }),
        ],
    NgxsResetPluginModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    ApiModule,
    EmptyLayoutModule,
    // DropDownModule,
    FontAwesomeModule,
    WebsocketModule.config({
      url: environment.ws,
    }),
    ReactiveFormsModule,
    TuiRootModule,
    TuiNotificationsModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiDialogModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiHintControllerModule,
    TuiFieldErrorModule,
    TuiInputPasswordModule,
    TuiLetModule,
    TuiNotificationModule,
    TuiScrollbarModule,
    TuiOverscrollModule,
    TuiExpandModule,
    TuiValidatorModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFilterByInputPipeModule,
    TuiFieldErrorPipeModule,
  ],
  providers: [
    { provide: 'Window', useValue: window },
    DestroyService,
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly backgroundModeService: BackgroundModeService) {}
}
