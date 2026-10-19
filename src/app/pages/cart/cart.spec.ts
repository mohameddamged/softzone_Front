import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Cart } from './cart';

describe('Cart', () => {
  let fixture: ComponentFixture<Cart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Cart);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
