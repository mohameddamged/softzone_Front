import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { RestaurantsService } from '../../services/restaurants.service';
import { CartService } from '../../services/cart.service';
import { MenuItem, Page, Restaurant, img } from '../../services/models';

@Component({
  selector: 'app-menu',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private menuApi = inject(MenuService);
  private restaurantsApi = inject(RestaurantsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  cart = inject(CartService);

  readonly size = 4;
  id = 0;
  page = signal(1);
  restaurant = signal<Restaurant | null>(null);
  data = signal<Page<MenuItem>>({ items: [], totalPages: null });
  loading = signal(false);
  error = signal('');

  imgOf = (m: MenuItem) => img(m, m.id);
  pages = computed(() => {
    const t = this.data().totalPages;
    const last = t != null ? t : this.page() + (this.data().items.length === this.size ? 1 : 0);
    return Array.from({ length: Math.max(last, 1) }, (_, i) => i + 1);
  });

  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.cart.start(this.id);
    this.restaurantsApi.getById(this.id).subscribe({ next: r => this.restaurant.set(r), error: () => {} });
    this.load();
  }

  go(p: number) { this.page.set(p); this.load(); }
  next() { this.router.navigate(['/reserve']); }

  load() {
    this.loading.set(true); this.error.set('');
    this.menuApi.getMenu(this.id, this.page(), this.size).subscribe({
      next: d => { this.data.set(d); this.loading.set(false); },
      error: e => { this.loading.set(false); this.error.set(`Could not load the menu (status ${e.status}).`); },
    });
  }
}
