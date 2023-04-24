export class StringHelper {
  public static toPrice(price: number): string {
    let temp = price;
    const stringArr = [];
    let result = '';
    while (temp !== 0) {
      stringArr.push(temp % 10);
      temp /= 10;
    }
    while (stringArr.length !== 0) {
      result += stringArr.pop();
      if (stringArr.length % 3 === 0) result += '.';
    }
    return result;
  }
}
