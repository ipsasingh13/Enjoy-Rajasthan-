import { WishlistItem } from '../types';

const WISHLIST_KEY = 'rajasthan_tourism_wishlist_v1';

export function getWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load wishlist from localStorage:', e);
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]): void {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('wishlist-updated'));
  } catch (e) {
    console.error('Failed to save wishlist to localStorage:', e);
  }
}

export function isWishlisted(id: string): boolean {
  const items = getWishlist();
  return items.some(item => item.id === id);
}

export function toggleWishlistItem(item: WishlistItem): { added: boolean; items: WishlistItem[] } {
  const items = getWishlist();
  const exists = items.some(i => i.id === item.id);
  
  let newItems: WishlistItem[];
  if (exists) {
    newItems = items.filter(i => i.id !== item.id);
  } else {
    newItems = [{ ...item, addedAt: new Date().toISOString() }, ...items];
  }
  
  saveWishlist(newItems);
  return { added: !exists, items: newItems };
}

export function removeFromWishlist(id: string): WishlistItem[] {
  const items = getWishlist();
  const newItems = items.filter(i => i.id !== id);
  saveWishlist(newItems);
  return newItems;
}

export function clearWishlist(): void {
  saveWishlist([]);
}
