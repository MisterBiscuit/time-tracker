import {Component, computed, forwardRef, Input, signal} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';

export const ICON_OPTIONS = [
  'work',
  'code',
  'meeting_room',
  'support_agent',
  'bug_report',
  'science',
  'school',
  'build',
  'design_services',
  'flight',
  'beach_access',
  'event_busy',
  'local_hospital',
  'settings',
  'timer',
  'check_circle',
] as const;
export type IconName = typeof ICON_OPTIONS[number];

@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatIcon,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconSelectorComponent),
      multi: true,
    },
  ],
  templateUrl: './icon-selector.component.html',
  styles: `
    .full-width {
      width: 100%;
    }
    mat-option {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .icon-label {
      font-family: monospace;
      opacity: 0.85;
    }
  `,
})
export class IconSelectorComponent {
  @Input() label = 'Icon';

  private _value = signal<IconName | null>(null);
  public value = this._value.asReadonly();
  public disabled: boolean = false;

  public filter = signal<string>('');

  public filteredIcons = computed((() => {
    return ICON_OPTIONS.filter(icon => icon.toLowerCase().includes(this.filter().toLowerCase()));
  }));

  public onChange: (value: IconName | null) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: IconName | null): void {
    this._value.set(value);
  }

  public registerOnChange(fn: (value: IconName | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onSelect(icon: IconName | null): void {
    this._value.set(icon);
    this.onChange(icon);
  }
}
