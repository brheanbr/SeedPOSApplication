import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/_models';
import { Order } from 'src/app/_models/Order';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() products$: Product;
  @Output() selectedProduct = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  selectProduct(product: Product) {
    this.selectedProduct.emit(product);
  }

}
