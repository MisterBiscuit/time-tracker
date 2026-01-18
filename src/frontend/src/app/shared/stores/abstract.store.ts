import {inject, Signal, signal, WritableSignal} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs';

import {AbstractApi} from '@shared/apis/abstract.api';
import {CommonEntity} from '@shared/interfaces';
import {ComponentType} from '@angular/cdk/portal';

export abstract class AbstractStore<T extends CommonEntity> {
  protected dialog = inject(MatDialog);

  protected abstract api: AbstractApi<T>;
  protected abstract itemLabel: string;
  protected abstract dialogComponent: ComponentType<any>;

  private _items: WritableSignal<T[]> = signal<T[]>([]);
  public readonly items: Signal<T[]> = this._items.asReadonly();

  public load(): void {
    this.api.list().subscribe((items: T[]) => this._items.set(items));
  }

  public create(payload: Omit<T, 'id'>): void {
    this.api.create(payload).subscribe((item: T) => {
      this._items.update(list => [...list, item]);
    });
  }

  public update(id: string, payload: Partial<T>): void {
    this.api.update(id, payload).subscribe((item: T) => {
      this._items.update(list => list.map(x => x.id === id ? item : x));
    });
  }

  public remove(id: string): void {
    this.api.remove(id).subscribe(() => {
      this._items.update(list => list.filter(x => x.id !== id));
    });
  }

  public openForm(item?: T): void {
    const title: string = item ? `Edit ${this.itemLabel}` : `New ${this.itemLabel}`;
    this.dialog.open(this.dialogComponent, {
      data: {
        title,
        item,
      },
      width: '600px',
    })
      .afterClosed()
      .pipe(
        filter(Boolean),
      )
      .subscribe((result: T) => {
        if (item?.id) {
          const payload: T = {
            ...item,
            ...result,
          };
          this.update(item.id, payload);
        } else {
          this.create(result);
        }
      });
  }
}
