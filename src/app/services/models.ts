import { environment } from '../../environments/environment';

export interface City { id: number; name: string; [k: string]: any }
export interface Restaurant { id: number; name: string; description?: string; [k: string]: any }
export interface MenuItem { id: number; name: string; description?: string; price: number; [k: string]: any }
export interface Page<T = any> { items: T[]; totalPages: number | null }
export interface CartLine { item: MenuItem; qty: number }
export interface Customer { name: string; phone: string; email: string; address: string }
export interface CheckoutRequest {
  restaurantId: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  orderItems: { menuItemId: number; quantity: number }[];
}

const FALLBACK = [
  'photo-1504674900247-0877df9cc836', 'photo-1565299624946-b28f40a0ae38', 'photo-1540189549336-e6e99c3679fe',
  'photo-1555939594-58d7cb561ad1', 'photo-1546069901-ba9599a7e63c', 'photo-1567620905732-2d1ec7ab7445',
].map(id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`);

/** Turns a relative path like "/assets/images/item1.jpg" into "<serverUrl>/assets/images/item1.jpg". */
export const withServerUrl = (path: string): string =>
  /^(https?:)?\/\/|^data:/i.test(path) ? path : `${environment.serverUrl}/${path.replace(/^\/+/, '')}`;

/** Image from whatever field the API uses (prefixed with the server URL), else a stock food photo. */
export const img = (o: any, i = 0): string => {
  const path = o?.imageUrl || o?.imageURL || o?.imagePath || o?.image || o?.photoUrl || o?.photo || o?.logoUrl || o?.picture;
  return path ? withServerUrl(path) : FALLBACK[Math.abs(+i || 0) % FALLBACK.length];
};

/**
 * Unwraps the API envelope { data: { items, totalPages, ... }, success, message }.
 * Also accepts a plain array or { items } / { data: [...] } shapes.
 */
export function unwrap<T>(r: any, size: number): Page<T> {
  const body = r?.data && !Array.isArray(r.data) ? r.data : r;
  const items: T[] = Array.isArray(body) ? body : body?.items ?? body?.data ?? body?.results ?? body?.value ?? [];
  let totalPages: number | null = body?.totalPages ?? body?.pageCount ?? null;
  const total = body?.totalCount ?? body?.totalItems ?? body?.total;
  if (totalPages == null && total != null) totalPages = Math.max(1, Math.ceil(total / size));
  return { items, totalPages };
}
