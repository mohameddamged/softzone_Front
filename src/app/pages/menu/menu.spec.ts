import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Menu } from './menu';

describe('Menu', () => {
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Menu);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
