import {Component, computed, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
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
import {SplitComponent, SplitLeftComponent, SplitRightComponent} from '@components/split/split.component';

@Component({
  selector: 'app-time-off',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    SplitComponent,
    SplitLeftComponent,
    SplitRightComponent,
  ],
  templateUrl: './time-off.component.html',
  styleUrl: './time-off.component.scss',
})
export class TimeOffComponent {

  public readonly storageService = inject(StorageService);

  public readonly displayedColumns: string[] = ['date', 'label', 'actions'];
  public bulk: string = '';

  public dates = computed(() => {
    return this.storageService.timeOff().sort((a, b) => a.date.localeCompare(b.date));
  });

  public addBulk(): void {
    const lines = this.bulk.split('\n')
      .map(date => date.trim())
      .filter(Boolean);

    const newTimeOffs = lines.map(line => {
      const date = line.includes('|') ? line.split('|')[0].trim() : line;
      const label = line.includes('|') ? line.split('|')[1].trim() : '';
      return {
        id: crypto.randomUUID(),
        date,
        label,
      };
    });
    this.storageService.timeOff.update(list => [...list, ...newTimeOffs ]);
    this.storageService.sync();
    this.bulk = '';
  }

  public remove(id: string): void {
    this.storageService.timeOff.update(list =>
      list.filter(t => t.id !== id)
    );
    this.storageService.sync();
  }
}
