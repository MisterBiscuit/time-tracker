import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
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

import {WorkType} from '@shared/interfaces';
import {WorkTypeStore} from '@shared/stores/work-type.store';

@Component({
  selector: 'app-work-type-list',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatMiniFabButton
  ],
  templateUrl: './work-type-list.component.html',
})
export class WorkTypeListComponent {
  public readonly workTypeStore = inject(WorkTypeStore);

  public readonly displayedColumns: string[] = ['label', 'symbol', 'actions'];

  public openForm(workType?: WorkType): void {
    this.workTypeStore.openForm(workType);
  }

  public remove(id: string): void {
    this.workTypeStore.remove(id);
  }
}
