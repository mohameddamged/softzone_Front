import { Injectable, computed, signal } from '@angular/core';
import { CartLine, Customer, MenuItem } from './models';

/** Client-side state: selected items + customer details. */
@Injectable({ providedIn: 'root' })
export class CartService {
  restaurantId = signal<number | null>(null);
  lines = signal<CartLine[]>([]);
  customer = signal<Customer>({ name: '', phone: '', email: '', address: '' });

  count = computed(() => this.lines().length);
  total = computed(() => this.lines().reduce((s, l) => s + (+l.item.price || 0) * l.qty, 0));

  start(id: number) {
    if (this.restaurantId() !== id) this.lines.set([]);
    this.restaurantId.set(id);
  }
  has = (id: number) => this.lines().some(l => l.item.id === id);
  toggle(item: MenuItem) {
    this.lines.update(ls => (ls.some(l => l.item.id === item.id) ? ls.filter(l => l.item.id !== item.id) : [...ls, { item, qty: 1 }]));
  }
  setQty(id: number, qty: number) {
    this.lines.update(ls => ls.map(l => (l.item.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  }
  remove(id: number) { this.lines.update(ls => ls.filter(l => l.item.id !== id)); }
  clear() { this.lines.set([]); }
}
