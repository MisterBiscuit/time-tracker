import {inject, Injectable} from '@angular/core';
import {DateStateManager} from '@shared/date-state.manager';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {DailyLogComponent} from '@components/daily-log/daily-log.component';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  private readonly dateStateManager = inject(DateStateManager);
  private readonly drawerStateManager = inject(DrawerStateManager);
  private readonly router = inject(Router);

  constructor() {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (this.shouldIgnore(event)) {
      console.log('ignored');
      return;
    }
    console.log('key', event.key);

    switch (event.key.toLowerCase()) {
      case 'n':
      case '>':
      case 'arrowright':
        event.preventDefault();
        this.dateStateManager.nextDay();
        break;
      case 'p':
      case '<':
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
        this.drawerStateManager.show(DailyLogComponent);
        break;
      case 's':
        event.preventDefault();
        void this.router.navigateByUrl('summary');
        break;
      case 'c':
        event.preventDefault();
        void this.router.navigateByUrl('calendar');
        break;
    }
  }

  private shouldIgnore(event: KeyboardEvent): boolean {
    if (this.drawerStateManager.isOpen()) {
      return true;
    }
    const target = event.target as HTMLElement;
    if (!target) {
      return false;
    }
    const inputSelected = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    const keyCombo = event.ctrlKey || event.metaKey;
    return inputSelected || keyCombo;
  }
}
