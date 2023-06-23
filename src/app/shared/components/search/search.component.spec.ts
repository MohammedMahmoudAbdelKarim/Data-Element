import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search query on input change', () => {
    const spy = spyOn(component.searchEmitter, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    const searchQuery = 'test search query';

    component.searchControl = new FormControl();
    fixture.detectChanges();

    inputElement.value = searchQuery;
    inputElement.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith(searchQuery);
  });

  it('should debounce search query input', fakeAsync(() => {
    const spy = spyOn(component.searchEmitter, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    const searchQuery = 'test search query';

    component.searchControl = new FormControl();
    fixture.detectChanges();

    inputElement.value = searchQuery;
    inputElement.dispatchEvent(new Event('input'));

    tick(500);

    expect(spy).toHaveBeenCalledWith(searchQuery);
  }));

  it('should not emit search query if input value is the same as previous', fakeAsync(() => {
    const spy = spyOn(component.searchEmitter, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    const searchQuery = 'test search query';

    component.searchControl = new FormControl();
    fixture.detectChanges();

    inputElement.value = searchQuery;
    inputElement.dispatchEvent(new Event('input'));

    tick(250);

    inputElement.dispatchEvent(new Event('input'));

    tick(250);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(searchQuery);
  }));

  afterEach(() => {
    fixture.destroy();
  });
});
