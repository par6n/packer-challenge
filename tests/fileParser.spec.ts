import { FileParser } from '../src/fileParser';

describe('parses the input file correctly', () => {
  it('parses a simple example string', () => {
    const [pkg] = FileParser.parseString(`8 : (1,15.3,€34)`);
    expect(pkg.capacity).toBe(8);
    expect(pkg.items[0]).toEqual({
      index: 1,
      weight: 15.3,
      price: 34,
    });
  });

  it('handles an invalid string', () => {
    expect.assertions(1);
    try {
      FileParser.parseString(`8 : (1,3)`);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  it('handles multiple packages', () => {
    const packages =
      FileParser.parseString(`81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)
8 : (1,15.3,€34)`);

    expect(packages).toHaveLength(2);
    expect(packages[1].capacity).toBe(8);
    expect(packages[1].items[0].weight).toBe(15.3);
  });

  it('handles integer weight and decimal prices', () => {
    const packages = FileParser.parseString('20 : (1,5,€6.7)');
    expect(packages).toHaveLength(1);
    expect(packages[0].items[0].weight).toBe(5);
    expect(packages[0].items[0].price).toBe(6.7);
  });

  it('parses a file', () => {
    const packages = FileParser.parseFile('./resources/example_input');

    expect(packages).toHaveLength(4);
    expect(packages[3].capacity).toBe(56);
  });
});
