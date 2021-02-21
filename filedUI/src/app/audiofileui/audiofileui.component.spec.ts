import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiofileuiComponent } from './audiofileui.component';

describe('AudiofileuiComponent', () => {
  let component: AudiofileuiComponent;
  let fixture: ComponentFixture<AudiofileuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiofileuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiofileuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
