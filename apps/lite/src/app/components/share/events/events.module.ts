import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './events-list/events-list.component';

@NgModule({
  declarations: [EventsListComponent],
  imports: [CommonModule, EventsRoutingModule],
})
export class EventsModule {}
