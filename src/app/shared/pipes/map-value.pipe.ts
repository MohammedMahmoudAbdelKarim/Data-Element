import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapValue',
  standalone: true,
})
export class MapValuePipe implements PipeTransform {
  transform(obj?: any, key?: string): any {
    if (obj && key) {
      return obj[key];
    }
  }
}
