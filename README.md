# Packer Challenge

## Problem

You want to send your friend a package with different things.

Each thing you put inside the package has such parameters as index number, weight and cost. The package has a weight limit. Your goal is to determine which things to put into the package so that the total weight is less than or equal to the package limit and the total cost is as large as possible.

## Solution

This project uses a common greedy 1-0 knapsack solution to calculate the most optimal set of items. This is done by sorting the price of item from higher to lower, looping through remaining items until the package is filled.

It consists of two main classes:
```
src/
  packer.ts ~~~ contains the API method and knapsack solution
  fileParser.ts ~~~ utility methods to parse the input file
```

## Installation
```bash
yarn install # install the dependencies
yarn test # runs the unit and integration tests
```
