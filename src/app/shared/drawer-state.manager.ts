import {Injectable, Signal, signal, Type} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DrawerStateManager {
  private _open = signal<boolean>(false);
  private _component = signal<Type<any> | null>(null);
  private _inputs = signal<Record<string, any>>({});

  public isOpen = this._open.asReadonly();
  public component = this._component.asReadonly();
  public inputs = this._inputs.asReadonly();

  public open(): void {
    this._open.set(true);
  }

  public close(): void {
    this._open.set(false);
    this._component.set(null);
    this._inputs.set({});
  }

  public show<T>(component: Type<T>, inputs?: Partial<T>): void {
    const wrappedInputs: Record<string, Signal<any>> = {};

    if (inputs) {
      for (const [key, value] of Object.entries(inputs)) {
        wrappedInputs[key] = signal(value);
      }
    }

    this._component.set(component);
    this._inputs.set(wrappedInputs);
    this._open.set(true);
  }
}
