import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs';

import {
  TimeEntryFormDialogComponent
} from '@features/time-entries/time-entry-form-dialog/time-entry-form-dialog.component';
import {TimeEntry} from '@shared/interfaces';
import {TimeEntryStore} from '@shared/stores/time-entry.store';
import {TimeOffStore} from '@shared/stores/time-off.store';
import {toLocalDateString} from './helpers';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private readonly dialog = inject(MatDialog);
  private readonly timeEntryStore = inject(TimeEntryStore);
  private readonly timeOffStore = inject(TimeOffStore);

  public expectedMinutes(date: Date): number {
    const day = date.getDay();
    if ([0, 6].includes(day)) {
      return 0;
    }
    return day === 5 ? 60 * 7 : 60 * 8;
  }

  public isLoggable(date: Date): boolean {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return false;
    }

    const iso = toLocalDateString(date);
    return !this.timeOffStore.items().some(t => t.date === iso);
  }

  public openLogForm(entry?: TimeEntry): void {
    const title: string = entry ? 'Edit time entry' : 'New time entry';
    this.dialog.open(TimeEntryFormDialogComponent, {
      data: {
        title,
        item: entry,
      },
      width: '600px',
    })
      .afterClosed()
      .pipe(
        filter(Boolean),
      )
      .subscribe((result: TimeEntry) => {
        if (entry?.id) {
          this.timeEntryStore.update(entry.id, result);
        } else {
          this.timeEntryStore.create(result);
        }
      });
  }
}
