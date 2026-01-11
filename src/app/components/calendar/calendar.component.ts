import {Component, computed, effect, EventEmitter, inject, Output, signal} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {DailyLogComponent} from '@components/daily-log/daily-log.component';
import {CalendarService} from '@shared/calendar.service';
import {DateStateManager} from '@shared/date-state.manager';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {DurationPipe} from '@shared/duration.pipe';
import {toLocalDateString} from '@shared/helpers';
import {StorageService} from '@shared/storage.service';
import {TimeOff} from '@shared/interfaces';

type EmptyDay = { type: 'empty'; iso: string; };
type OffDay = { type: 'off'; iso: string; label: string | undefined; day: number };
type WorkedDay = { type: 'worked'; iso: string; day: number; loggable: boolean; logged: number; expected: number };
type CalendarDay = EmptyDay | OffDay | WorkedDay;

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

  public days = signal<CalendarDay[]>([]);
  public current = computed((() => toLocalDateString(this.dateStateManager.current())));

  constructor() {
    effect(() => {
      const year: number = this.dateStateManager.year();
      const month: number = this.dateStateManager.month();

      const date = new Date(year, month, 1);
      const days: CalendarDay[] = [];

      const padStart = this.mondayIndex(date);
      for (let i = 0; i < padStart; i++) {
        days.push({ type: 'empty', iso: '' });
      }

      while (date.getMonth() === month) {
        const iso: string = toLocalDateString(date);
        const off: TimeOff | undefined = this.storageService.timeOff().find(t => t.date === iso);
        const day: number = date.getDate();

        if (off) {
          days.push({
            type: 'off',
            label: off.label,
            iso,
            day,
          });
        } else {

          const logged: number = this.storageService.entries()
            .filter(entry => entry.date === iso)
            .reduce((sum, entry) => sum + entry.minutes, 0);

          days.push({
            type: 'worked',
            iso,
            day: date.getDate(),
            loggable: this.calendarService.isLoggable(date),
            logged,
            expected: this.calendarService.expectedMinutes(date),
          });
        }

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

  public isEmpty(day: CalendarDay): day is EmptyDay {
    return day.type === 'empty';
  }

  public isOff(day: CalendarDay): day is OffDay {
    return day.type === 'off';
  }

  public isWorked(day: CalendarDay): day is WorkedDay {
    return day.type === 'worked';
  }
}
