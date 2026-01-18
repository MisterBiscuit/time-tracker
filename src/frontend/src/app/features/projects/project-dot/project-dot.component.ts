import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-project-dot',
  standalone: true,
  imports: [],
  template: `<span class="dot" [style.background]="colour"></span>`,
  styles: `
    .dot {
      width: 16px;
      height: 16px;
      border-radius: 30%;
      display: inline-block;
      margin-right: 6px;
    }
  `,
})
export class ProjectDot {
  @Input({ required: true }) colour!: string;
}
