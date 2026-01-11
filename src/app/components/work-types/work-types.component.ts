import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
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
import {StorageService} from '@shared/storage.service';
import {WorkType} from '@shared/interfaces';
import {SplitComponent, SplitLeftComponent, SplitRightComponent} from '@components/split/split.component';

@Component({
  selector: 'app-work-types',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
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
    SplitComponent,
    SplitLeftComponent,
    SplitRightComponent
  ],
  templateUrl: './work-types.component.html',
})
export class WorkTypesComponent {
  public readonly storageService = inject(StorageService);

  public readonly displayedColumns: string[] = ['label', 'symbol', 'actions'];

  public workTypeLabel: string = '';
  public workTypeSymbol: string = '';

  public addWorkType(): void {
    if (!this.workTypeLabel) {
      return;
    }

    const newWorkType: WorkType = {
      id: crypto.randomUUID(),
      label: this.workTypeLabel,
      symbol: this.workTypeSymbol,
    };
    this.storageService.workTypes.update(list => [...list, newWorkType]);
    this.storageService.sync();
    this.workTypeLabel = '';
    this.workTypeSymbol = '';
  }

  public remove(id: string): void {
    this.storageService.workTypes.update(list => list.filter(workType => workType.id !== id));
    this.storageService.entries.update(list => list.filter(entry => entry.workTypeId !== id));
    this.storageService.sync();
  }
}
