import { Component, OnInit, ChangeDetectionStrategy, ContentChildren, QueryList, Output , EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { AutocompleteOptionComponent } from '../autocomplete-option/autocomplete-option.component';

@Component({
  selector: 'c-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputAutocompleteComponent implements OnInit {
  isFocused = false;
  control = new FormControl('');
  private searchTerms = new Subject<string>();
  @Output() searchEvent = new EventEmitter<string>();
  @ContentChildren(AutocompleteOptionComponent) options$!: QueryList<AutocompleteOptionComponent>;

  // optionClicked(optionValue: string) {
  //   this.control.setValue(optionValue);
  // }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => this.searchEvent.emit(value));
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
}
