import { readFileSync } from 'fs';

const LINE_PATTERN = /\((\d+),(\d.+),€(\d+)\)/;

export class FileParser {
  static parseFile(src: string): Package[] {
    const fileContents = readFileSync(src, 'utf-8');
    return this.parseString(fileContents);
  }

  static parseString(str: string): Package[] {
    const lines = str.split('\n');
    return lines.filter((line) => !!line).map(this.parsePackage.bind(this));
  }

  static parsePackage(packageLine: string): Package {
    const [maxWeight, itemsString] = packageLine.split(' : ');
    return {
      capacity: parseInt(maxWeight, 10),
      items: this.parseItems(itemsString),
    };
  }

  static parseItems(itemsString: string): Item[] {
    return itemsString.split(' ').map((itemString) => {
      const matchResults = itemString.match(LINE_PATTERN);
      if (matchResults === null) {
        throw new Error(`Invalid line: "${itemsString}`);
      }

      const [, index, weight, price] = matchResults;
      return {
        index: parseInt(index, 10),
        weight: parseFloat(weight),
        price: parseInt(price, 10),
      };
    });
  }
}
