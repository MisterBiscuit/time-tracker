import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  public transform(minutes: number | null | undefined, zeroIfEmpty: boolean = true): string {
    if (!minutes) {
      return zeroIfEmpty ? '00:00' : '';
    }
    const sign = minutes < 0 ? '-' : '';
    const abs = Math.abs(minutes);

    const h = Math.floor(abs / 60);
    const m = abs % 60;

    return `${sign}${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
}
