import { Pipe, PipeTransform } from '@angular/core';
import { IComponentPercentage } from 'src/app/recipes/models/recipe.dto';

@Pipe({
  name: 'currentPercentageAssign',
})
export class CurrentPercentageAssignPipe implements PipeTransform {
  transform(value: IComponentPercentage[], percentage: number): number {
    console.info('bbb', value);
    if (value.length > 0 && percentage) {
      return value.reduce((acc, curr) => acc - curr.percentage, percentage);
    } else {
      return 0;
    }
  }
}
