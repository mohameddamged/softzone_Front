import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let cart: CartService;
  const item = { id: 1, name: 'Soup', price: 10 };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cart = TestBed.inject(CartService);
  });

  it('toggles items and computes the total', () => {
    cart.toggle(item);
    expect(cart.has(1)).toBe(true);
    cart.setQty(1, 3);
    expect(cart.total()).toBe(30);
    cart.toggle(item);
    expect(cart.count()).toBe(0);
  });

  it('never lets quantity drop below 1', () => {
    cart.toggle(item);
    cart.setQty(1, 0);
    expect(cart.lines()[0].qty).toBe(1);
  });

  it('clears the cart when switching restaurant', () => {
    cart.start(1);
    cart.toggle(item);
    cart.start(2);
    expect(cart.count()).toBe(0);
  });
});
