import {Component, computed, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {ProjectDot} from '@components/project-dot/project-dot.component';
import {CalendarService} from '@shared/calendar.service';
import {DateStateManager} from '@shared/date-state.manager';
import {DurationPipe} from '@shared/duration.pipe';
import {toLocalDateString} from '@shared/helpers';
import {TimeEntry} from '@shared/interfaces';
import {StorageService} from '@shared/storage.service';

@Component({
  selector: 'app-logged-time-list',
  standalone: true,
  imports: [
    DurationPipe,
    MatIcon,
    ProjectDot,
    MatTable,
    MatCell,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatMiniFabButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './logged-time-list.component.html',
})
export class LoggedTimeListComponent {
  public readonly calendarService = inject(CalendarService);
  public readonly dateStateManager = inject(DateStateManager);
  public readonly storageService = inject(StorageService);

  public readonly displayedColumns: string[] = ['duration', 'project', 'workType', 'comment', 'actions'];

  public entriesForDay = computed(() => {
    return this.storageService.entries()
      .filter(entry => entry.date === toLocalDateString(this.dateStateManager.current()))
  });

  public openForm(entry?: TimeEntry): void {
    return this.calendarService.openLogForm(entry);
  }

  public remove(id: string): void {
    this.storageService.entries.update(list => list.filter(entry => entry.id !== id));
    this.storageService.sync();
  }

  public projectColour(id: string): string {
    return this.storageService.projects().find(project => project.id === id)?.colour ?? '#999';
  }

  public projectName(id: string): string {
    return this.storageService.projects().find(project => project.id === id)?.name ?? 'Unknown project';
  }

  public workTypeLabel(id: string): string | undefined {
    return this.storageService.workTypes().find(workType => workType.id === id)?.label ?? 'Unknown label';
  }

  public workTypeSymbol(id: string): string | undefined {
    return this.storageService.workTypes().find(workType => workType.id === id)?.symbol ?? id;
  }
}
