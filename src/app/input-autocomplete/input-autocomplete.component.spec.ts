import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputAutocompleteComponent } from './input-autocomplete.component';

describe('InputAutocompleteComponent', () => {
  let component: InputAutocompleteComponent;
  let fixture: ComponentFixture<InputAutocompleteComponent>;
  const inputSelector = "input";
  const optionsSelector = ".options";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the dropdown on focus in/out', () => {
    const input = fixture.debugElement.query(By.css(inputSelector)).nativeElement;
    let options = fixture.debugElement.query(By.css(optionsSelector));

    expect(component.isFocused).toBeFalse();
    expect(options).toBeFalsy();

    input.focus();
    // input.dispatchEvent(new Event("focus"));

    fixture.detectChanges();
    // flush();

    options = fixture.debugElement.query(By.css(optionsSelector));
    // expect(component.isFocused).toBeTrue();
    expect(options).toBeTruthy();
  });

  it('should call search on input', fakeAsync(() => {
    const searchTerm = "Test name";
    spyOn(component.searchEvent, "emit");
    const input = fixture.debugElement.query(By.css(inputSelector)).nativeElement;
    input.value = searchTerm;
    input.dispatchEvent(new Event("input"));
    // component.control.setValue(searchTerm);


    expect(component.searchEvent.emit).toHaveBeenCalledWith(searchTerm);
  });
});
