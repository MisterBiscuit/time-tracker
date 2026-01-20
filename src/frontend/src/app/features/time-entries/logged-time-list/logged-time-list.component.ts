import {Component, computed, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';

import {ProjectDot} from '@features/projects/project-dot/project-dot.component';
import {DateStateManager} from '@shared/date-state.manager';
import {toLocalDateString} from '@shared/helpers';
import {TimeEntry} from '@shared/interfaces';
import {DurationPipe} from '@shared/pipes/duration.pipe';
import {WorkTypeStore} from '@shared/stores/work-type.store';
import {ProjectStore} from '@shared/stores/project.store';
import {AbstractListComponent} from '@features/abstract-list.component';

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
    MatRowDef,
    ProjectDot
  ],
  templateUrl: './logged-time-list.component.html',
})
export class LoggedTimeListComponent extends AbstractListComponent<TimeEntry> {
  public readonly dateStateManager = inject(DateStateManager);
  private readonly projectStore = inject(ProjectStore);
  private readonly workTypeStore = inject(WorkTypeStore);

  public readonly displayedColumns: string[] = ['duration', 'project', 'workType', 'comment', 'actions'];

  public entriesForDay = computed(() => {
    return this.items()
      .filter(entry => entry.date === toLocalDateString(this.dateStateManager.current()))
  });

  public projectColour(id: string): string {
    return this.projectStore.items().find(project => project.id === id)?.colour ?? '#999';
  }

  public projectName(id: string): string {
    return this.projectStore.items().find(project => project.id === id)?.name ?? 'Unknown project';
  }

  public workTypeLabel(id: string): string | undefined {
    return this.workTypeStore.items().find(workType => workType.id === id)?.label ?? 'Unknown label';
  }

  public workTypeSymbol(id: string): string | undefined {
    return this.workTypeStore.items().find(workType => workType.id === id)?.symbol ?? id;
  }
}
