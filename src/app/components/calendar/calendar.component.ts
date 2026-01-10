import {Component, computed, effect, EventEmitter, inject, input, Output, signal} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {CalendarService} from '@shared/calendar.service';
import {DateStateManager} from '@shared/date-state.manager';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {DurationPipe} from '@shared/duration.pipe';
import {toLocalDateString} from '@shared/helpers';
import {StorageService} from '@shared/storage.service';
import {DailyLogComponent} from '@components/daily-log/daily-log.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatCard,
    DurationPipe,
    MatCardContent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  private readonly storageService = inject(StorageService);
  private readonly calendarService = inject(CalendarService);
  private readonly drawerStateManager = inject(DrawerStateManager);
  public readonly dateStateManager = inject(DateStateManager);

  @Output() dateSelected = new EventEmitter<string>();

  public days = signal<any[]>([]);
  public current = computed((() => toLocalDateString(this.dateStateManager.current())));

  constructor() {
    effect(() => {
      const year = this.dateStateManager.year();
      const month = this.dateStateManager.month();

      const date = new Date(year, month, 1);
      const days: any[] = [];

      const padStart = this.mondayIndex(date);
      for (let i = 0; i < padStart; i++) {
        days.push({ empty: true });
      }

      while (date.getMonth() === month) {
        const iso = toLocalDateString(date);
        const off = this.storageService.timeOff().find(t => t.date === iso);
        const logged = this.storageService.entries()
          .filter(entry => entry.date === iso)
          .reduce((sum, entry) => sum + entry.minutes, 0);

        days.push({
          iso,
          off,
          day: date.getDate(),
          logged,
          expected: this.calendarService.expectedMinutes(date),
        });
        date.setDate(date.getDate() + 1);
      }

      this.days.set(days);
    });
  }

  public mondayIndex(date: Date): number {
    return (date.getDay() + 6) % 7;
  }

  public selectDate(date: string): void {
    this.dateStateManager.set(date);
    this.drawerStateManager.show(DailyLogComponent);
  }
}
