import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatToolbar,
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
  styles: `
    .spacer {
      flex: 1 1 auto;
    }
  `,
})
export class ToolbarComponent {}
