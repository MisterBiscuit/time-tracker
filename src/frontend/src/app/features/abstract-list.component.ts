import {Directive, EventEmitter, Input, Output, Signal} from '@angular/core';

@Directive()
export abstract class AbstractListComponent<T> {

  @Input({ required: true }) items!: Signal<T[]>;
  @Output() editClick: EventEmitter<T> = new EventEmitter<T>();
  @Output() removeClick: EventEmitter<T> = new EventEmitter<T>();

  public abstract displayedColumns: string[];
}
