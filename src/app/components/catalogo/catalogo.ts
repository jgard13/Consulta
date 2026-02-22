import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/producto/producto.service';
import { ProductCardComponent } from '../producto-card/producto-card';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent {

  products;

  constructor(private productsService: ProductsService) {
    this.products = toSignal(
      this.productsService.getAll(),
      { initialValue: [] }
    );
  }
}