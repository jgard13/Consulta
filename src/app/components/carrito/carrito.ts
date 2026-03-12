import { Component } from '@angular/core';
import { CarritoService, CartItem } from '../../services/carrito/carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent {

  get items(): CartItem[] {
    return this.carritoService.items();
  }

  get total(): number {
    return this.carritoService.total();
  }

  constructor(private carritoService: CarritoService) {}

  remove(productId: number): void {
    this.carritoService.removeFromCart(productId);
  }

  clear(): void {
    this.carritoService.clearCart();
  }

  downloadReceipt(): void {
    this.carritoService.generateXmlReceipt();
  }
}
