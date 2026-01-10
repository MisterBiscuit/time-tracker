import {Component, inject} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {DateStateManager} from '@shared/date-state.manager';

@Component({
  selector: 'app-date-nav',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './date-nav.component.html',
  styleUrl: './date-nav.component.scss',
})
export class DateNavComponent {
  public readonly dateStateManager = inject(DateStateManager);
}
