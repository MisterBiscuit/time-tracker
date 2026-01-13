import {Component, inject} from '@angular/core';
import {CalendarComponent} from '@components/calendar/calendar.component';
import {DateNavComponent} from '@components/date-nav/date-nav.component';
import {ShortcutHelperComponent} from '@components/shortcut-helper/shortcut-helper.component';
import {SplitComponent, SplitLeftComponent, SplitRightComponent} from '@components/split/split.component';
import {LoggedTimeListComponent} from '@components/logged-time-list/logged-time-list.component';
import {MatButton} from '@angular/material/button';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {DailyLogComponent} from '@components/daily-log/daily-log.component';
import {Project, TimeEntry} from '@shared/interfaces';
import {TimeEntryFormDialogComponent} from '@components/project-form-dialog/time-entry-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {StorageService} from '@shared/storage.service';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CalendarComponent,
    DateNavComponent,
    ShortcutHelperComponent,
    SplitComponent,
    SplitLeftComponent,
    SplitRightComponent,
    LoggedTimeListComponent,
    LoggedTimeListComponent,
    MatButton,
  ],
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss',
})
export class CalendarPage {
  private readonly dialog = inject(MatDialog);
  private readonly storageService = inject(StorageService);

  public openForm(entry?: TimeEntry): void {
    const title: string = entry ? 'Edit time entry' : 'New time entry';
    this.dialog.open(TimeEntryFormDialogComponent, {
      data: {
        title,
        timeEntry: entry,
      },
      disableClose: true,
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
