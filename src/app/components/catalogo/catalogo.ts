import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/producto/producto.service';
import { ProductoCardComponent } from '../producto-card/producto-card';
import { CarritoComponent } from '../carrito/carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductoCardComponent, CarritoComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent {
  private productsService = inject(ProductsService);
  products = toSignal(this.productsService.getAll(), { initialValue: [] });
}