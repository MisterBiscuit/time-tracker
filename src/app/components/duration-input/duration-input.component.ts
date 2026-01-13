import {Component, forwardRef, Input, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatChip} from '@angular/material/chips';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatList} from '@angular/material/list';

export interface DurationPreset {
  label: string;
  value: number;
}

@Component({
  selector: 'app-duration-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatList,
    MatChip
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
  ],
  templateUrl: './duration-input.component.html',
})
export class DurationInputComponent implements ControlValueAccessor {
  @Input() label = 'Duration';
  @Input() presets: DurationPreset[] = [];

  public hours = signal<number>(0);
  public minutes = signal<number>(0);
  public disabled: boolean = false;

  public onChange: (value: number | null) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(totalMinutes: number | null): void {
    if (!totalMinutes) {
      this.hours.set(0);
      this.minutes.set(0);
      return;
    }

    this.hours.set(Math.floor(totalMinutes / 60));
    this.minutes.set(totalMinutes % 60);
  }

  public setHours(hours: number): void {
    this.hours.set(hours || 0);
    this.update();
  }

  public setMinutes(minutes: number): void {
    this.minutes.set(minutes || 0);
    this.update();
  }

  public update(): void {
    const total = this.hours() * 60 + this.minutes();
    this.onChange(total);
  }

  public setPreset(totalMinutes: number): void {
    this.writeValue(totalMinutes);
    this.onChange(totalMinutes);
  }

  public registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
