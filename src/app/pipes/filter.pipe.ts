import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[],property: string, value: string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;

    if (property === "")
      return items.filter(item =>
        item.toString().toLowerCase().indexOf(value.toLowerCase()) != -1);

    return items.filter(item =>
      item[property].toString().toLowerCase().indexOf(value.toLowerCase()) != -1);
  }
}
