import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ShortcutHelperDialogComponent} from '@components/shortcut-helper-dialog/shortcut-helper-dialog.component';
import {StorageFacadeService} from '@shared/export.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatToolbar,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  private readonly dialog = inject(MatDialog);
  private readonly storageFacadeService = inject(StorageFacadeService);

  public openHelpDialog(): void {
    this.dialog.open(ShortcutHelperDialogComponent, { width: '600px' });
  }

  public export(): void {
    const data = this.storageFacadeService.export();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `time-tracker-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  public import(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input.files);
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        this.storageFacadeService.import(data);
      } catch {
        alert('Invalid file');
      }
    };
    reader.readAsText(file);
  }
}
