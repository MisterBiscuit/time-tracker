import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {KeyboardService} from '@shared/keyboard.service';
import {ToolbarComponent} from '@components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly keyboardService = inject(KeyboardService);

  public readonly title = 'Time Tracker';
}
