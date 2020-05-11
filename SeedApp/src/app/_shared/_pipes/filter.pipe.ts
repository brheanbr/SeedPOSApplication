import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/_models';
@Pipe({
  name: 'filterProducts'
})
export class FilterPipe implements PipeTransform {
    transform(product: Product[], searchTerm: string): Product[] {
        if (!product || !searchTerm) {
            return product;
        }

        return product.filter(product => product.ProductName.toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1 || product.ProductType.toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
