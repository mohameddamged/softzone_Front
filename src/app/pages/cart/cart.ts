import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { MenuItem, img } from '../../services/models';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private ordersApi = inject(OrdersService);
  private router = inject(Router);
  cart = inject(CartService);

  customer = this.cart.customer;
  busy = signal(false);
  done = signal(false);
  error = signal('');
  doneName = '';
  imgOf = (m: MenuItem) => img(m, m.id);

  ngOnInit() { if (!this.cart.count() || !this.customer().name) this.router.navigate(['/']); }

  back() { this.router.navigate(['/reserve']); }

  checkout() {
    const c = this.customer();
    this.busy.set(true); this.error.set('');
    this.ordersApi.checkout({
      restaurantId: this.cart.restaurantId()!,
      customerName: c.name, customerPhone: c.phone, customerEmail: c.email, customerAddress: c.address,
      orderItems: this.cart.lines().map(l => ({ menuItemId: l.item.id, quantity: l.qty })),
    }).subscribe({
      next: () => { this.doneName = c.name; this.cart.clear(); this.busy.set(false); this.done.set(true); },
      error: e => {
        this.busy.set(false);
        this.error.set(e?.error?.message || e?.error?.title || `Checkout failed (status ${e.status}). Please try again.`);
      },
    });
  }
}
