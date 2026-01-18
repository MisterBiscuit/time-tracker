import {DecimalPipe} from '@angular/common';
import {Component, effect, inject, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';

import {ProjectDot} from '@features/projects/project-dot/project-dot.component';
import {DurationPipe} from '@shared/pipes/duration.pipe';
import {CalendarService} from '@shared/calendar.service';
import {sortByField, toLocalDateString} from '@shared/helpers';
import {DateStateManager} from '@shared/date-state.manager';
import {WorkTypeStore} from '@shared/stores/work-type.store';
import {TimeEntryStore} from '@shared/stores/time-entry.store';
import {ProjectStore} from '@shared/stores/project.store';

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
    ProjectDot,
  ],
  templateUrl: './summary.page.html',
  styleUrl: './summary.page.scss',
})
export class SummaryPage {
  private readonly calendarService = inject(CalendarService);
  private readonly dateStateManager = inject(DateStateManager);
  private readonly projectStore = inject(ProjectStore);
  private readonly timeEntryStore = inject(TimeEntryStore);
  private readonly workTypeStore = inject(WorkTypeStore);

  public workTypes = this.workTypeStore.items().sort(sortByField('label'));

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
        logged += this.timeEntryStore.items()
          .filter(entry => entry.date === iso)
          .reduce((sum, entry) => sum + entry.minutes, 0);
        date.setDate(date.getDate() + 1);
      }

      this.expected.set(expected);
      this.logged.set(logged);
      this.remaining.set(expected - logged);
    });
  }

  public rows = this.projectStore.items()
    .sort(sortByField('name'))
    .map(project => {
      const entries = this.timeEntryStore.items()
        .filter(entry => entry.projectId === project.id && new Date(entry.date).getMonth() === this.dateStateManager.month());
      const byType: Record<string, number> = {};
      let total = 0;
      for (const entry of entries) {
        byType[entry.workTypeId] = (byType[entry.workTypeId] || 0) + entry.minutes;
        total += entry.minutes;
      }

      return { project: project.name, colour: project.colour || '#999', byType, total };
    });
}
