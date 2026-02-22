import { Component, Input } from "@angular/core";
import { Product } from "../../models/producto/producto.model";

@Component({
  selector: 'app-product-card',
  standalone:true,
  templateUrl:'./producto-card.html',
  styleUrls:['./producto-card.css'],
})

export class ProductCardComponent{
  @Input({required:true}) product !: Product;
}