import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'emptyimage',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class ImagePipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return '/records/default.png';
    }
    return value;
  }
}
