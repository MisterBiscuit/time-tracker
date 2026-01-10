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
    MatRow
  ],
  template: `
    <table mat-table [dataSource]="dataSource" displayed class="mat-elevation-z8">
      <ng-container matColumnDef="label">
        <th mat-header-cell *matHeaderCellDef>Label</th>
        <td mat-cell *matCellDef="let element">{{ element.label }}</td>
      </ng-container>

      <ng-container matColumnDef="keys">
        <th mat-header-cell *matHeaderCellDef>Keys</th>
        <td mat-cell *matCellDef="let element">
          @for(key of element.keys; track key) {
            <mat-chip>{{ key }}</mat-chip>
          }
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
})
export class ShortcutHelperComponent {
  public readonly displayedColumns: string[] = ['label', 'keys'];
  public readonly dataSource = [
    { label: 'Next page', keys: ['N', '>', '→'] },
    { label: 'Previous page', keys: ['P', '<', '←'] },
    { label: 'Log time', keys: ['L'] },
    { label: 'Summary', keys: ['S'] },
    { label: 'Calendar', keys: ['C'] },
  ];
}
