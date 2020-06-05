import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxChar'
})
export class MaxCharPipe implements PipeTransform {

  transform(strValue: String, numberChar: number): any {
    
    let result = strValue.substring(0, numberChar);
    if(result.length >= numberChar)
      result += '...';

    return result;
  }
}
