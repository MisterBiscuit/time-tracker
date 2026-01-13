import {NgComponentOutlet} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {RouterOutlet} from '@angular/router';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {KeyboardService} from '@shared/keyboard.service';
import {ToolbarComponent} from '@components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDrawer, MatDrawerContainer, MatDrawerContent, NgComponentOutlet, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly drawerStateManager = inject(DrawerStateManager);
  public readonly keyboardService = inject(KeyboardService);

  public readonly title = 'Time Tracker';
}
