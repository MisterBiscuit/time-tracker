import {DecimalPipe} from '@angular/common';
import {Component, effect, inject, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';
import {DurationPipe} from '@shared/duration.pipe';
import {StorageService} from '@shared/storage.service';
import {CalendarService} from '@shared/calendar.service';
import {sortByField, toLocalDateString} from '@shared/helpers';
import {DateStateManager} from '@shared/date-state.manager';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-monthly-summary',
  standalone: true,
  imports: [
    MatCard,
    DurationPipe,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatProgressBar,
    DecimalPipe,
    MatCardContent,
    MatIcon,
  ],
  templateUrl: './summary.page.html',
  styleUrl: './summary.page.scss',
})
export class SummaryPage {
  private readonly storageService = inject(StorageService);
  private readonly calendarService = inject(CalendarService);
  private readonly dateStateManager = inject(DateStateManager);

  public workTypes = this.storageService.workTypes().sort(sortByField('label'));

  public expected = signal<number>(0);
  public logged = signal<number>(0);
  public remaining = signal<number>(0);

  constructor() {
    effect(() => {
      const year = this.dateStateManager.year();
      const month = this.dateStateManager.month();

      let expected = 0;
      let logged = 0;

      const date = new Date(year, month, 1);
      while (date.getMonth() === month) {
        expected += this.calendarService.expectedMinutes(date);

        const iso = toLocalDateString(date);
        logged += this.storageService.entries()
          .filter(entry => entry.date === iso)
          .reduce((sum, entry) => sum + entry.minutes, 0);
        date.setDate(date.getDate() + 1);
      }

      this.expected.set(expected);
      this.logged.set(logged);
      this.remaining.set(expected - logged);
    });
  }

  public rows = this.storageService.projects()
    .sort(sortByField('name'))
    .map(project => {
      const entries = this.storageService.entries()
        .filter(entry => entry.projectId === project.id && new Date(entry.date).getMonth() === this.dateStateManager.month());
      const byType: Record<string, number> = {};
      let total = 0;
      for (const entry of entries) {
        byType[entry.workTypeId] = (byType[entry.workTypeId] || 0) + entry.minutes;
        total += entry.minutes;
      }

      return { project: project.name, colour: project.colour, byType, total };
    });
}
