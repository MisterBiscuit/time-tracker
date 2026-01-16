import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {toLocalDateString} from './helpers';
import {MatDialog} from '@angular/material/dialog';
import {TimeEntry} from '@shared/interfaces';
import {TimeEntryFormDialogComponent} from '@components/project-form-dialog/time-entry-form-dialog.component';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private readonly storageService = inject(StorageService);
  private readonly dialog = inject(MatDialog);

  public expectedMinutes(date: Date): number {
    const iso = toLocalDateString(date);
    const override = this.storageService.overrides().find(o => o.date === iso);
    if (override) {
      return override.minutes;
    }
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
    return !this.storageService.timeOff().some(t => t.date === iso);
  }

  public openLogForm(entry?: TimeEntry): void {
    const title: string = entry ? 'Edit time entry' : 'New time entry';
    this.dialog.open(TimeEntryFormDialogComponent, {
      data: {
        title,
        timeEntry: entry,
      },
      width: '600px',
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log(result);
          if (entry) {
            this.storageService.entries.update(list => list.map(p => p.id === entry?.id ? {...p, ...result} : p));

          } else {
            this.storageService.entries.update(list => [...list, {
              ...result,
              id: crypto.randomUUID(),
            }]);
          }

          this.storageService.sync();
        }
      });
  }
}
