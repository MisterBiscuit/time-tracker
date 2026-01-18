import {inject, Injectable} from '@angular/core';

import {TimeEntryFormDialogComponent} from '@features/time-entries/time-entry-form-dialog/time-entry-form-dialog.component';
import {TimeEntryApi} from '@shared/apis/time-entry.api';
import {TimeEntry} from '@shared/interfaces';
import {AbstractStore} from '@shared/stores/abstract.store';

@Injectable({ providedIn: 'root' })
export class TimeEntryStore extends AbstractStore<TimeEntry> {
  protected readonly api = inject(TimeEntryApi);
  protected readonly itemLabel: string = 'Time entry';
  protected readonly dialogComponent = TimeEntryFormDialogComponent;
}
