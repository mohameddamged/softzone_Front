import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Reserve } from './reserve';

describe('Reserve', () => {
  let fixture: ComponentFixture<Reserve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reserve],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Reserve);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
