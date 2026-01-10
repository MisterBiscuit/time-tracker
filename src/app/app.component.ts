import {NgComponentOutlet} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {KeyboardService} from '@shared/keyboard.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, RouterLink, MatToolbar, MatIcon, MatDrawer, MatDrawerContainer, MatDrawerContent, NgComponentOutlet],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly drawerStateManager = inject(DrawerStateManager);
  public readonly keyboardService = inject(KeyboardService);

  public readonly title = 'Time Tracker';
}
