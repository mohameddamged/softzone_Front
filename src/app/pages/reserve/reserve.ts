import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MenuItem, img } from '../../services/models';

@Component({
  selector: 'app-reserve',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})
export class Reserve {
  private router = inject(Router);
  cart = inject(CartService);

  customer = { ...this.cart.customer() };
  tried = signal(false);
  special = computed(() => this.cart.lines()[0]?.item);
  imgOf = (m: MenuItem) => img(m, m.id);

  ngOnInit() { if (!this.cart.count()) this.router.navigate(['/']); }

  back() {
    const id = this.cart.restaurantId();
    this.router.navigate(id ? ['/restaurant', id] : ['/']);
  }

  confirm(valid: boolean | null) {
    this.tried.set(true);
    if (!valid) return;
    this.cart.customer.set({ ...this.customer });
    this.router.navigate(['/cart']);
  }
}
