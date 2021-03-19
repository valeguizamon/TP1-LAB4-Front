import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmNoticiaComponent } from './abm-noticia.component';

describe('AbmNoticiaComponent', () => {
  let component: AbmNoticiaComponent;
  let fixture: ComponentFixture<AbmNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
