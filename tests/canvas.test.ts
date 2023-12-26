import { show } from '@/utils';
import { Vector } from '@/math';
import { Canvas } from '@/draw/canvas';
import { Rectangle } from '@/draw/shapes';

test('canvas', () => {
  let canvas = new Canvas();

  const rect = new Rectangle({ x: 400, y: 400, width: 400, height: 200});
  canvas.addShape(rect);

  console.log(canvas.render());

  expect(21 + 21).toBe(42);
});

test('rect-shape', () => {
  const rect = new Rectangle({ x: 400, y: 400, width: 400, height: 200});

  // test attributes
  expect(rect.x).toBe(400);
  expect(rect.y).toBe(400);
  expect(rect.width).toBe(400);
  expect(rect.height).toBe(200);

  // test anchors
  expect(rect.center()).toStrictEqual(new Vector(400, 400));
  expect(rect.north()).toStrictEqual(new Vector(400, 300));
  expect(rect.east()).toStrictEqual(new Vector(600, 400));
  expect(rect.west()).toStrictEqual(new Vector(200, 400));
  expect(rect.south()).toStrictEqual(new Vector(400, 500));

  // test anchors with directions should be cardinal direction anchors

  let v1: Vector;
  let v2: Vector;

  v1 = rect.direction(0);
  v2 = rect.east();
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  v1 = rect.direction(90);
  v2 = rect.south();
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  v1 = rect.direction(180)
  v2 = rect.west();
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  v1 = rect.direction(270)
  v2 = rect.north();
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  v1 = rect.direction(360)
  v2 = rect.east();
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  // test anchors with directions on corners of the rectangle

  v1 = rect.direction(45);
  v2 = new Vector(rect.x + rect.width / 2, rect.y + rect.height / 2);
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  v1 = rect.direction(135);
  v2 = new Vector(rect.x - rect.width / 2, rect.y + rect.height / 2);
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  v1 = rect.direction(225);
  v2 = new Vector(rect.x - rect.width / 2, rect.y - rect.height / 2);
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);

  v1 = rect.direction(315);
  v2 = new Vector(rect.x + rect.width / 2, rect.y - rect.height / 2);
  expect(v1.x).toBeCloseTo(v2.x, 5);
  expect(v1.y).toBeCloseTo(v2.y, 5);
});
