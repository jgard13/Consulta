import { Component, Input } from '@angular/core';
import { Product } from '../../models/producto/producto.model';
import { CarritoService } from '../../services/carrito/carrito';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css'
})
export class ProductoCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(private carritoService: CarritoService) {}

  addToCart(): void {
    this.carritoService.addToCart(this.product);
  }
}