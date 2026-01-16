import {Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatChip} from '@angular/material/chips';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-shortcut-helper',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatChip,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './shortcut-helper-dialog.component.html',
})
export class ShortcutHelperDialogComponent {
  public readonly displayedColumns: string[] = ['label', 'keys'];
  public readonly dataSource = [
    { label: 'Next page', keys: ['→'] },
    { label: 'Previous page', keys: ['←'] },
    { label: 'Log time', keys: ['L'] },
    { label: 'Summary', keys: ['S'] },
    { label: 'Calendar', keys: ['C'] },
    { label: 'Projects', keys: ['P'] },
    { label: 'Work types', keys: ['W'] },
    { label: 'Help', keys: ['H'] },
  ];
}
