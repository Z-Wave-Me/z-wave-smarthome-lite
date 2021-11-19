import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalSettingsComponent } from '../personal-settings/personal-settings.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalSettingsRoutingModule {}
