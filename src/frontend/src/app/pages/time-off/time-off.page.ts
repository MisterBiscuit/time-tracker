import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

import {TimeOffListComponent} from '@features/time-off/time-off-list/time-off-list.component';
import {TimeOffStore} from '@shared/stores/time-off.store';

@Component({
  selector: 'app-time-off',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    TimeOffListComponent,
  ],
  templateUrl: './time-off.page.html',
})
export class TimeOffPage {
  public timeOffStore = inject(TimeOffStore);

  public openForm(): void {
    this.timeOffStore.openForm();
  }
}
