import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ShortcutHelperDialogComponent} from '@components/shortcut-helper-dialog/shortcut-helper-dialog.component';
import {CalendarService} from '@shared/calendar.service';
import {DateStateManager} from '@shared/date-state.manager';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  private readonly calendarService = inject(CalendarService);
  private readonly dateStateManager = inject(DateStateManager);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  constructor() {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
  }

  private onKeyDown(event: KeyboardEvent): void {

    const dialogOpened: boolean = this.dialog.openDialogs.length > 0;

    // If a dialog is opened and the user pressed Ctrl + Enter, try and submit the dialog
    const isControlEnter = event.key === 'Enter' && event.ctrlKey;
    if (dialogOpened && isControlEnter) {
      this.dialog.openDialogs.forEach((dialog) => {
        if ('submit' in dialog.componentInstance) {
          dialog.componentInstance.submit();
        }
      });
      return;
    }

    // Otherwise if a dialog is opened, do nothing
    if (this.dialog.openDialogs.length) {
      return;
    }

    // Dialog not opened, handle the key press
    switch (event.key.toLowerCase()) {
      case 'arrowright':
        event.preventDefault();
        this.dateStateManager.nextDay();
        break;
      case 'arrowleft':
        event.preventDefault();
        this.dateStateManager.previousDay();
        break;
      case 'arrowup':
        event.preventDefault();
        this.dateStateManager.previousWeek();
        break;
      case 'arrowdown':
        event.preventDefault();
        this.dateStateManager.nextWeek();
        break;
      case 'l':
        event.preventDefault();
        this.calendarService.openLogForm();
        break;
      case 's':
        event.preventDefault();
        void this.router.navigateByUrl('summary');
        break;
      case 'c':
        event.preventDefault();
        void this.router.navigateByUrl('calendar');
        break;
      case 'p':
        event.preventDefault();
        void this.router.navigateByUrl('projects');
        break;
      case 'w':
        event.preventDefault();
        void this.router.navigateByUrl('work-types');
        break;
      case 't':
        event.preventDefault();
        void this.router.navigateByUrl('time-off');
        break;
      case 'h':
        event.preventDefault();
        this.dialog.open(ShortcutHelperDialogComponent, { width: '600px' });
    }
  }
}
