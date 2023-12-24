import { show } from '@/utils';
import {
  SVGDocument,
  Group,
  Rectangle
} from '@/draw/svg';

test('svg-group', () => {

  let elements = [];
  for (let k = 0; k < 32; k++) {
    const x = 100 + (Math.random() * 100 - 50);
    const y = 100 + (Math.random() * 100 - 50);
    const rect = new Rectangle(x, y, 16, 16, 4, 4);
    elements.push(rect);
  }

  const group = new Group(elements);

  const doc = new SVGDocument(200, 200);
  console.log(doc.render(group));

  expect(21 + 21).toBe(42);
});
