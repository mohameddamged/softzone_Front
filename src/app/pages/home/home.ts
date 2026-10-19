import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitiesService } from '../../services/cities.service';
import { RestaurantsService } from '../../services/restaurants.service';
import { City, Page, Restaurant, img } from '../../services/models';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private citiesApi = inject(CitiesService);
  private restaurantsApi = inject(RestaurantsService);

  readonly size = 3;
  readonly stars = [1, 2, 3, 4, 5];
  readonly stats = [
    { icon: '🏪', n: '137', label: 'Restaurant' }, { icon: '🙂', n: '158', label: 'People Served' },
    { icon: '😋', n: '659K', label: 'Happy Service' }, { icon: '👥', n: '235', label: 'Regular users' },
  ];

  name = '';
  cityId: number | null = null;
  query = signal('');
  page = signal(1);
  cities = signal<City[]>([]);
  data = signal<Page<Restaurant>>({ items: [], totalPages: null });
  loading = signal(false);
  error = signal('');

  imgOf = (r: Restaurant) => img(r, r.id);
  shown = computed(() => this.data().items.filter(r => (r.name || '').toLowerCase().includes(this.query().toLowerCase())));
  hasNext = computed(() => {
    const t = this.data().totalPages;
    return t != null ? this.page() < t : this.data().items.length === this.size;
  });
  pages = computed(() => {
    const t = this.data().totalPages;
    const last = t != null ? t : this.page() + (this.hasNext() ? 1 : 0);
    return Array.from({ length: Math.max(last, 1) }, (_, i) => i + 1);
  });

  ngOnInit() {
    this.load(); // default: all restaurants, no city selected
    this.citiesApi.getCities().subscribe({
      next: p => this.cities.set(p.items),
      error: e => this.error.set(`Could not load cities (status ${e.status}). Check the API URL in src/environments and that CORS is enabled.`),
    });
  }

  search() { this.query.set(this.name.trim()); this.page.set(1); this.load(); }
  go(p: number) { this.page.set(p); this.load(); }

  load() {
    this.loading.set(true); this.error.set('');
    this.restaurantsApi.getRestaurants(this.cityId, this.page(), this.size).subscribe({
      next: d => { this.data.set(d); this.loading.set(false); },
      error: e => { this.loading.set(false); this.error.set(`Could not load restaurants (status ${e.status}).`); },
    });
  }
}
