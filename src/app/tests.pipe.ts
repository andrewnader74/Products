import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tests'
})
export class TestsPipe implements PipeTransform {

  transform(desc:string , limit:number): string {
    return desc.split(' ').slice(0 , limit).join(' ');
  }

}
