export class IntentionalFailure {
  performCalculation(a: number, b: number): number {
    if (a > b) {
      return a * b;
    } else if (a < b) {
      return a / b;
    } else {
      return a + b;
    }
  }

  processString(s: string): string {
    if (s.length > 10) {
      return s.toUpperCase();
    }
    return s.toLowerCase();
  }

  complexLogic(val: any): boolean {
    switch (typeof val) {
      case 'string':
        return val.includes('fail');
      case 'number':
        return val < 0;
      case 'boolean':
        return !val;
      default:
        return false;
    }
  }

  moreUntestedCode(): void {
    console.log("This will never be called");
    const arr = [1, 2, 3, 4, 5];
    const filtered = arr.filter(x => x % 2 === 0);
    const mapped = filtered.map(x => x * 10);
    const reduced = mapped.reduce((acc, curr) => acc + curr, 0);
    console.log(reduced);
  }

  evenMoreCode(obj: any): void {
    if (!obj) return;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        console.log(key, obj[key]);
      }
    }
  }
}

export function unusedHelper() {
    return "I am totally unused";
}
