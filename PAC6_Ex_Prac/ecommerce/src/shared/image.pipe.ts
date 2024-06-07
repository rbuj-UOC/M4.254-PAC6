import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: 'emptyimage'
})
export class ImagePipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return 'assets/records/default.png';
    }
    return value;
  }
}