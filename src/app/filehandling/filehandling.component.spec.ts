import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilehandlingComponent } from './filehandling.component';

describe('FilehandlingComponent', () => {
  let component: FilehandlingComponent;
  let fixture: ComponentFixture<FilehandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilehandlingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilehandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
