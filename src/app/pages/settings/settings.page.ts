import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {TimeOffComponent} from '@components/time-off/time-off.component';
import {ProjectsComponent} from '@components/projects/projects.component';
import {WorkTypesComponent} from '@components/work-types/work-types.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatTabGroup,
    MatTab,
    TimeOffComponent,
    ProjectsComponent,
    WorkTypesComponent,
  ],
  templateUrl: './settings.page.html',
})
export class SettingsPage {
}
