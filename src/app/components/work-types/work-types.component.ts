import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {StorageService} from '@shared/storage.service';
import {WorkType} from '@shared/interfaces';

@Component({
  selector: 'app-work-types',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './work-types.component.html',
})
export class WorkTypesComponent {
  public readonly storageService = inject(StorageService);

  public workTypeLabel: string = '';
  public workTypeSymbol: string = '';

  public addWorkType(): void {
    if (!this.workTypeLabel) {
      return;
    }

    const newWorkType: WorkType = {
      id: crypto.randomUUID(),
      label: this.workTypeLabel,
      symbol: this.workTypeSymbol,
    };
    this.storageService.workTypes.update(list => [...list, newWorkType]);
    this.storageService.sync();
    this.workTypeLabel = '';
    this.workTypeSymbol = '';
  }

  public removeWorkType(id: string): void {
    this.storageService.workTypes.update(list => list.filter(workType => workType.id !== id));
    this.storageService.entries.update(list => list.filter(entry => entry.workTypeId !== id));
    this.storageService.sync();
  }
}
