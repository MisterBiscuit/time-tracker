import {inject, Injectable} from '@angular/core';

import {TimeOffFormDialogComponent} from '@features/time-off/time-off-form-dialog/time-off-form-dialog.component';
import {TimeOffApi} from '@shared/apis/time-off.api';
import {TimeOff} from '@shared/interfaces';
import {AbstractStore} from '@shared/stores/abstract.store';

@Injectable({ providedIn: 'root' })
export class TimeOffStore extends AbstractStore<TimeOff> {
  protected readonly api = inject(TimeOffApi);
  protected readonly itemLabel = 'Time off';
  protected readonly dialogComponent = TimeOffFormDialogComponent;

  public autofill(): void {
    this.api.autofill().subscribe(() => this.load());
  }
}
