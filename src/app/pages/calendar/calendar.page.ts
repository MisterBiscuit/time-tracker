import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {CalendarComponent} from '@components/calendar/calendar.component';
import {DateNavComponent} from '@components/date-nav/date-nav.component';
import {SplitComponent, SplitLeftComponent, SplitRightComponent} from '@components/split/split.component';
import {LoggedTimeListComponent} from '@components/logged-time-list/logged-time-list.component';
import {TimeEntry} from '@shared/interfaces';
import {CalendarService} from '@shared/calendar.service';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CalendarComponent,
    DateNavComponent,
    SplitComponent,
    SplitLeftComponent,
    SplitRightComponent,
    LoggedTimeListComponent,
    LoggedTimeListComponent,
    MatButton,
  ],
  templateUrl: './calendar.page.html',
})
export class CalendarPage {
  private readonly calendarService = inject(CalendarService);

  public openForm(entry?: TimeEntry): void {
    this.calendarService.openLogForm(entry);
  }
}
