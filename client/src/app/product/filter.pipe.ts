import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../models/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: product[],filterString: string, property: string): product[] {
    console.log('pipe run');
    if (value.length === 0 || !filterString) {
      return value;
    }
    let filteredprods: product[] = [];
    for (let prod of value) {
      if (prod[property].toLowerCase().includes(filterString.toLowerCase())) {
        filteredprods.push(prod);
      }
    }
    return filteredprods;
  }

}
