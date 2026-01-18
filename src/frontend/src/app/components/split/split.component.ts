import {Component} from '@angular/core';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'split-left',
  template: `<ng-content>Left</ng-content>`
})
export class SplitLeftComponent {}

@Component({
  selector: 'split-right',
  template: `<ng-content>Right</ng-content>`
})
export class SplitRightComponent {}

@Component({
  selector: 'app-split',
  standalone: true,
  imports: [
    MatDivider
  ],
  template: `
    <div class="split">
      <div class="left">
        <ng-content select="split-left"></ng-content>
      </div>

      <mat-divider vertical></mat-divider>

      <div class="right p-3">
        <ng-content select="split-right"></ng-content>
      </div>
    </div>
  `,
  styleUrl: './split.component.scss',
})
export class SplitComponent {

}
