import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ShortcutHelperDialogComponent} from '@components/shortcut-helper-dialog/shortcut-helper-dialog.component';

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

  public openHelpDialog(): void {
    this.dialog.open(ShortcutHelperDialogComponent, { width: '600px' });
  }
}
