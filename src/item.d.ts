type Item = {
  index: number;
  price: number;
  weight: number;
};

type Package = {
  capacity: number;
  items: Item[];
};
