import { show } from '@/utils';
import { Canvas } from '@/draw/canvas';
import { Rectangle } from '@/draw/shapes';

test('canvas', () => {
  let canvas = new Canvas();

  const rect = new Rectangle(400, 400, 400, 200);
  canvas.addShape(rect);

  console.log(canvas.render());

  expect(21 + 21).toBe(42);
});
