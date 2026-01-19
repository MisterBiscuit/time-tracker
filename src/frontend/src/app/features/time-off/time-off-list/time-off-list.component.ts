import {Component, EventEmitter, Input, Output, Signal} from '@angular/core';
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
import {TimeOff} from '@shared/interfaces';

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
})
export class TimeOffListComponent {

  @Input({ required: true }) items!: Signal<TimeOff[]>;
  @Output() editClick: EventEmitter<TimeOff> = new EventEmitter<TimeOff>();
  @Output() removeClick: EventEmitter<TimeOff> = new EventEmitter<TimeOff>();

  public readonly displayedColumns: string[] = ['date', 'label', 'actions'];
}
