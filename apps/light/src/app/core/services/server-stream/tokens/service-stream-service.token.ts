import { inject, InjectionToken } from '@angular/core';
import { ServerStreamService } from '@core/services/server-stream/server-stream.service';
import { ApiService } from '@core/services/api/api.service';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LOGGER } from '../../../../tokens/logger.token';

// export const SERVER_STREAM_SERVICE =
//   new InjectionToken<ServerStreamService>('ServiceStreamService token', {
//     factory: () => {
//       return new ServerStreamService(inject(ApiService), inject(WebSocketService), new DestroyService(), inject(LOGGER));
//     }
//   });
