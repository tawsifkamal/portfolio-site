import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UntestedService {
  constructor() { }

  uncoveredMethod1(param: number): string {
    if (param > 10) {
      return 'Greater than 10';
    } else if (param < 0) {
      return 'Negative';
    } else {
      return 'Between 0 and 10';
    }
  }

  uncoveredMethod2(data: any[]): any[] {
    return data.map(item => {
      if (typeof item === 'string') {
        return item.toUpperCase();
      }
      return item;
    }).filter(item => !!item);
  }

  uncoveredMethod3() {
    console.log('This is totally uncovered');
    const x = 1 + 1;
    const y = x * 2;
    return y;
  }
}
