import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/producto/producto.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly total = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number): void {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  clearCart(): void {
    this._items.set([]);
  }

  generateXmlReceipt(): void {
    const items = this._items();
    const total = this.total();
    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n`;
    xml += `  <fecha>${now}</fecha>\n`;
    xml += `  <productos>\n`;

    for (const item of items) {
      xml += `    <producto>\n`;
      xml += `      <id>${item.product.id}</id>\n`;
      xml += `      <nombre><![CDATA[${item.product.name}]]></nombre>\n`;
      xml += `      <categoria><![CDATA[${item.product.category}]]></categoria>\n`;
      xml += `      <cantidad>${item.quantity}</cantidad>\n`;
      xml += `      <precioUnitario>${item.product.price.toFixed(2)}</precioUnitario>\n`;
      xml += `      <subtotal>${(item.product.price * item.quantity).toFixed(2)}</subtotal>\n`;
      xml += `    </producto>\n`;
    }

    xml += `  </productos>\n`;
    xml += `  <total>${total.toFixed(2)}</total>\n`;
    xml += `</recibo>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recibo_${Date.now()}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
