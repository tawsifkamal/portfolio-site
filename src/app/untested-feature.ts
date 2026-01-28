export class ComplexUntestedLogic {
  calculateFactorial(n: number): number {
    if (n < 0) {
      throw new Error('Negative number input');
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * this.calculateFactorial(n - 1);
  }

  processArray(arr: number[]): number[] {
    return arr
      .map((x) => x * 2)
      .filter((x) => x > 10)
      .reduce((acc, curr) => {
        if (curr % 5 === 0) {
          acc.push(curr);
        }
        return acc;
      }, [] as number[]);
  }

  checkPalindrome(s: string): boolean {
    const cleanStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const len = cleanStr.length;
    for (let i = 0; i < len / 2; i++) {
      if (cleanStr[i] !== cleanStr[len - 1 - i]) {
        return false;
      }
    }
    return true;
  }
}
