import { readFileSync } from 'fs';
import { Packer } from '../src/packer';

test('example input and output', () => {
  const output = Packer.pack('../resources/example_input');
  const expectedOutput = readFileSync('../resources/example_output', 'utf-8');

  expect(output).toBe(expectedOutput);
});
