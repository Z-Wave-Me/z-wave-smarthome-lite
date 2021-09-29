import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceControlService } from '@core/services/device-control/device-control.service';
import { Store } from '@ngxs/store';

// interface Report {}
@Component({
  selector: 'z-wave-switch-r-g-b-w-widget[id]',
  templateUrl: './switch-r-g-b-w-widget.component.html',
  styleUrls: ['./switch-r-g-b-w-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchRGBWWidgetComponent {
  @Input() id!: string;

  // data$: Observable<Report>;
  constructor(
    private readonly store: Store,
    private readonly deviceControlService: DeviceControlService
  ) {}

  command(action: string): void {
    this.deviceControlService.execute({ id: this.id, action });
  }

  // $scope.getRgbState = function(rgbId) {
  //   var baseId = rgbId.substr(0, rgbId.indexOf('-')),
  //     rgbIndex = _.findIndex($scope.dataHolder.devices.all, {
  //       id: rgbId
  //     }),
  //     dimmerIndex = _.findIndex($scope.dataHolder.devices.all, {
  //       id: baseId + '-0-38'
  //     }),
  //     softIndex = _.findIndex($scope.dataHolder.devices.all, {
  //       id: baseId + '-0-51-0'
  //     }),
  //     coldIndex = _.findIndex($scope.dataHolder.devices.all, {
  //       id: baseId + '-0-51-1'
  //     });
  //
  //   if (softIndex < 0 || coldIndex < 0)
  //     return false;
  //
  //   if ($scope.dataHolder.devices.all[dimmerIndex] && $scope.dataHolder.devices.all[dimmerIndex].metrics && $scope.dataHolder.devices.all[dimmerIndex].metrics.level && $scope.dataHolder.devices.all[dimmerIndex].metrics.level != 'off') {
  //     if (($scope.dataHolder.devices.all[softIndex] && $scope.dataHolder.devices.all[softIndex].metrics && $scope.dataHolder.devices.all[softIndex].metrics.level && $scope.dataHolder.devices.all[softIndex].metrics.level != 'off') ||
  //       ($scope.dataHolder.devices.all[coldIndex] && $scope.dataHolder.devices.all[coldIndex].metrics && $scope.dataHolder.devices.all[coldIndex].metrics.level && $scope.dataHolder.devices.all[coldIndex].metrics.level != 'off')) {
  //       return 'w';
  //     } else {
  //       return 'rgb';
  //     }
  //   } else {
  //     return 'off';
  //   }
  // };

  /**
   * set RGB state
   */
  // $scope.runRgbCmd = function(cmd, rgbId) {
  //   var baseId = rgbId.substr(0, rgbId.indexOf('-'))
  //   dimmerId = baseId + '-0-38',
  //     softId = baseId + '-0-51-0',
  //     coldId = baseId + '-0-51-1',
  //     softIndex = _.findIndex($scope.dataHolder.devices.all, {
  //       id: softId
  //     }),
  //     coldIndex = _.findIndex($scope.dataHolder.devices.all, {
  //       id: coldId
  //     });
  //
  //   switch (cmd) {
  //     case 'off':
  //       //perform off for dimmer
  //       $scope.runCmd(dimmerId + '/command/off', dimmerId);
  //       break;
  //     case 'rgb':
  //       // perform off for soft&cold if
  //       $scope.runCmd(softId + '/command/off', softId);
  //       $scope.runCmd(coldId + '/command/off', coldId);
  //
  //       // run on cmd for dimmer & rgb
  //       $scope.runCmd(rgbId + '/command/on', rgbId);
  //       $scope.runCmd(dimmerId + '/command/on', dimmerId);
  //       break;
  //     case 'w':
  //       // perform off for rgb and on for soft&warm and dimmer
  //       $scope.runCmd(rgbId + '/command/off', rgbId);
  //
  //       oldSoft = typeof $scope.dataHolder.devices.all[softIndex].metrics.oldLevel !== 'undefined' ? $scope.dataHolder.devices.all[softIndex].metrics.oldLevel : 99;
  //       oldCold = typeof $scope.dataHolder.devices.all[coldIndex].metrics.oldLevel !== 'undefined' ? $scope.dataHolder.devices.all[coldIndex].metrics.oldLevel : 99;
  //
  //       if (!oldSoft && !oldCold) {
  //         oldSoft = 99;
  //         oldCold = 99;
  //       }
  //       // perform on
  //       $scope.runCmd(softId + '/command/exact?level=' + oldSoft, softId);
  //       $scope.runCmd(coldId + '/command/exact?level=' + oldCold, coldId);
  //       $scope.runCmd(dimmerId + '/command/on', dimmerId);
  //       break;
  //   }
  //   return;
  // };
}
