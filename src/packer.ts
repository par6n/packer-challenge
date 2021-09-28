import { FileParser } from './fileParser';
import { ApiError } from './error';

const MAX_CAPACITY = 100;
const MAX_PRICE_PER_ITEM = 100;
const MAX_WEIGHT_PER_ITEM = 100;

export class Packer {
  static pack(inputFile: string): string {
    const packages = FileParser.parseFile(inputFile);
    const packagesItems: string[] = packages.map((pkg) => {
      const packageValidated = this.validatePackage(pkg);

      // if the package is invalid, throw an ApiError
      if (packageValidated !== true) {
        throw new ApiError(packageValidated);
      }

      const inPackage = this.knapsack(pkg.capacity, pkg.items);
      if (!inPackage.length) {
        return '-';
      }
      return inPackage.map((item) => item.index).join(',');
    });
    return packagesItems.join('\n'); // format the list in expected output format
  }

  /**
   * Validates a package against the set business constraints
   * @param pkg
   */
  static validatePackage(pkg: Package): string | true {
    if (pkg.capacity > MAX_CAPACITY) {
      return 'A package cannot be heavier than 100';
    }
    if (pkg.items.some((item) => item.price > MAX_PRICE_PER_ITEM)) {
      return `Item cannot have a price more than ${MAX_PRICE_PER_ITEM}`;
    }
    if (pkg.items.some((item) => item.weight > MAX_WEIGHT_PER_ITEM)) {
      return `Item cannot weigh more than ${MAX_WEIGHT_PER_ITEM}`;
    }

    return true;
  }

  /**
   * A greedy solution for 1-0 knapsack problem.
   * @param capacity
   * @param items
   */
  static knapsack(capacity: number, items: Item[]): Item[] {
    let totalValue = 0;
    let totalWeight = 0;
    let remainingItems = items.sort((a, b) => {
      return b.price / b.weight - a.price / b.weight;
    });
    const addedItems = [];

    while (remainingItems.length > 0) {
      const remainingCapacity = capacity - totalWeight;
      // Ignore the items that don't fit into the package
      remainingItems = remainingItems.filter((item) => {
        return item.weight <= remainingCapacity;
      });

      // No items can fit into the package, then continue
      if (remainingItems.length === 0) continue;

      // Otherwise, look for the next item remained
      let selected = remainingItems[0];

      // But let's look for a lighter item that has the equal price
      let itemWithSamePrice = remainingItems
        .filter(
          (item) =>
            item.price === selected.price && item.weight < selected.weight
        )
        .sort((a, b) => a.weight - b.weight)?.[0]; // find the lightest item

      // if we have such an item, then choose the more optimal item
      if (itemWithSamePrice) {
        selected = itemWithSamePrice;
      }

      // drop the selected item from the remaining list
      remainingItems = remainingItems.filter(
        (item) => item.index !== selected.index
      );

      // increment the total by the value and weight of the included item
      totalValue += selected.price;
      totalWeight += selected.weight;

      // memorize what we just added to the package :)
      addedItems.push(selected);
    }

    return addedItems;
  }
}
