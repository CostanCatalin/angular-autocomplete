import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { DataService } from './data.service';
import { AutocompleteOptionComponent } from './autocomplete-option/autocomplete-option.component';

@NgModule({
  declarations: [
    AppComponent,
    InputAutocompleteComponent,
    AutocompleteOptionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
