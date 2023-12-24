type Point = {
  x: number;
  y: number;
};

const p1: Point = {
  x: 5.0,
  y: 10.0,
};

const p2: Point = {
  x: -2.0,
  y: 3.0,
};

const getPointString = (p: Point): string => {
  return `Point { x: ${p.x}, y: ${p.y} }`;
};

console.log(getPointString(p1));
console.log(getPointString(p2));
