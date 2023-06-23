import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(size: number): string {
    return (size / (1024 * 1024)).toFixed(3) + ' MB';
  }
}
