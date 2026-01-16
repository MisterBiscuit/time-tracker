import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
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
import {WorkTypeFormDialogComponent} from '@components/work-type-form-dialog/work-type-form-dialog.component';
import {StorageService} from '@shared/storage.service';
import {WorkType} from '@shared/interfaces';

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
    MatFabButton,
    MatMiniFabButton
  ],
  templateUrl: './work-type-list.component.html',
})
export class WorkTypeListComponent {
  private readonly dialog = inject(MatDialog);
  public readonly storageService = inject(StorageService);

  public readonly displayedColumns: string[] = ['label', 'symbol', 'actions'];

  public openForm(workType?: WorkType): void {
    const title: string = workType ? 'Edit work type' : 'New work type';
    this.dialog.open(WorkTypeFormDialogComponent, {
      data: {
        title,
        workType,
      },
      width: '600px',
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (workType) {
            this.storageService.workTypes.update(list => list.map(p => p.id === workType?.id ? {...p, ...result} : p));

          } else {
            this.storageService.workTypes.update(list => [...list, {
              ...result,
              id: crypto.randomUUID(),
            }]);
          }

          this.storageService.sync();
        }
      });
  }

  public remove(id: string): void {
    this.storageService.workTypes.update(list => list.filter(project => project.id !== id));
    this.storageService.entries.update(list => list.filter(entry => entry.projectId !== id));
    this.storageService.sync();
  }
}
