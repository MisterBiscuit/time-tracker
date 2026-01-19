import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

import {TimeOffListComponent} from '@features/time-off/time-off-list/time-off-list.component';
import {TimeOff} from '@shared/interfaces';
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

  public openForm(item?: TimeOff): void {
    this.timeOffStore.openForm(item);
  }

  public remove(item: TimeOff): void {
    this.timeOffStore.remove(item.id);
  }

  public autofill(): void {
    this.timeOffStore.autofill();
  }
}
