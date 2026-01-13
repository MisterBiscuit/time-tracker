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
import {BankHolidayService} from '@shared/bank-holiday.service';

@Component({
  selector: 'app-time-off-list',
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

  ],
  templateUrl: './time-off-list.component.html',
  styleUrl: './time-off-list.component.scss',
})
export class TimeOffListComponent {

  public readonly bankHolidayService = inject(BankHolidayService);
  public readonly storageService = inject(StorageService);

  public readonly displayedColumns: string[] = ['date', 'label', 'actions'];

  public dates = computed(() => {
    return this.storageService.timeOff().sort((a, b) => a.date.localeCompare(b.date));
  });

  public refresh(): Promise<void> {
    return this.bankHolidayService.refresh();
  }

  public remove(id: string): void {
    this.storageService.timeOff.update(list => list.filter(timeOff => timeOff.id !== id));
    this.storageService.sync();
  }
}
