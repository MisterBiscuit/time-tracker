import {Component, inject, signal} from '@angular/core';
import {CalendarComponent} from '@components/calendar/calendar.component';
import {DailyLogComponent} from '@components/daily-log/daily-log.component';
import {DateNavComponent} from '@components/date-nav/date-nav.component';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {DateStateManager} from '@shared/date-state.manager';
import {toLocalDateString} from '@shared/helpers';
import {ShortcutHelperComponent} from '@components/shortcut-helper/shortcut-helper.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CalendarComponent,
    DateNavComponent,
    ShortcutHelperComponent,
  ],
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss',
})
export class CalendarPage {
  private readonly drawerStateManager = inject(DrawerStateManager);
  private readonly dateStateManager = inject(DateStateManager);

  public selectedDate = signal<string>(toLocalDateString(new Date()));

  public async openLog(date: string): Promise<void> {
    console.log('openLog', date);
    this.dateStateManager.set(date);
    this.drawerStateManager.show(DailyLogComponent);
  }
}
