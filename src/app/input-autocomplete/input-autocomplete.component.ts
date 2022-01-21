import { Component, ChangeDetectionStrategy, ContentChildren, QueryList, Output , EventEmitter } from '@angular/core';
import { AutocompleteOptionComponent } from '../autocomplete-option/autocomplete-option.component';

@Component({
  selector: 'c-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAutocompleteComponent {
  isFocused = false;
  @Output() searchEvent = new EventEmitter<string>();
  @ContentChildren(AutocompleteOptionComponent) options$!: QueryList<AutocompleteOptionComponent>;

  onInput(event: Event) {
    this.searchEvent.emit((<HTMLInputElement>event.target).value || '');
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
}
