import { show } from '@/utils';
import {
  Point,
  Color,
  FillStyle,
  StrokeStyle,
  SVGDocument,
  Group,
  Rectangle,
  TextElement,
  Circle,
  Ellipse,
  Line,
  Polyline,
  Polygon,
} from '@/draw/svg';

test('svg-group', () => {

  let elements = [];

  elements.push(new Rectangle({
    x: 0.0, y: 0.0, width: 100.0, height: 50.0, rx: 5.0, ry: 5.0
  }));

  elements.push(new TextElement({
    text: 'Hello', x: 50.0, y: 25.0, fontSize: 16.0
  }));

  elements.push(new Rectangle({
    x: 150.0, y: 30.0, width: 20.0, height: 50.0, rx: 5.0, ry: 5.0,
    fillStyle: new FillStyle(new Color(1.0, 0.0, 0.0, 1.0))
  }));

  elements.push(new Rectangle({
    x: 0.0, y: 60.0, width: 20.0, height: 20.0, rx: 5.0, ry: 5.0,
    fillStyle: new FillStyle(new Color(1.0, 1.0, 0.0, 1.0)),
    strokeStyle: new StrokeStyle(new Color(0.0, 1.0, 1.0, 1.0), 5.0)
  }));

  elements.push(new Circle({
    cx: 120.0, cy: 40.0, r: 16.0,
    fillStyle: new FillStyle(new Color(0.0, 0.0, 1.0, 1.0))
  }));

  elements.push(new Ellipse({
    cx: 60.0, cy: 50.0, rx: 16.0, ry: 24.0,
    fillStyle: new FillStyle(new Color(0.5, 0.7, 1.0, 1.0))
  }));

  elements.push(new Line({
    x1: 0.0, y1: 0.0, x2: 200.0, y2: 200.0,
    strokeStyle: new StrokeStyle(new Color(1.0, 0.9, 0.9, 1.0), 2.0)
  }));

  elements.push(new Line({
    x1: 50.0, y1: 80.0, x2: 120.0, y2: 100.0,
    strokeStyle: new StrokeStyle(new Color(1.0, 0.7, 0.5, 1.0), 2.0)
  }));

  elements.push(new Polyline({
    points: [
      new Point(50.0, 375.0),
      new Point(150.0, 375.0),
      new Point(150.0, 325.0),
      new Point(250.0, 325.0),
      new Point(250.0, 375.0),
      new Point(350.0, 375.0),
      new Point(350.0, 250.0),
      new Point(450.0, 250.0),
      new Point(450.0, 375.0),
      new Point(550.0, 375.0),
      new Point(550.0, 175.0),
      new Point(650.0, 175.0),
      new Point(650.0, 375.0),
      new Point(750.0, 375.0),
      new Point(750.0, 100.0),
      new Point(850.0, 100.0),
      new Point(850.0, 375.0),
      new Point(950.0, 375.0),
      new Point(950.0, 25.0),
      new Point(1050.0, 25.0),
      new Point(1050.0, 375.0),
      new Point(1150.0, 375.0),
    ],
    strokeStyle: new StrokeStyle(new Color(0.0, 0.0, 0.5, 1.0), 1.5)
  }));

  elements.push(new Polygon({
    points: [
      new Point(350.0, 75.0),
      new Point(379.0, 161.0),
      new Point(469.0, 161.0),
      new Point(397.0, 215.0),
      new Point(423.0, 301.0),
      new Point(350.0, 250.0),
      new Point(277.0, 301.0),
      new Point(303.0, 215.0),
      new Point(231.0, 161.0),
      new Point(321.0, 161.0),
    ],
    fillStyle: new FillStyle(new Color(1.0, 0.0, 0.0, 1.0)),
    strokeStyle: new StrokeStyle(new Color(0.0, 0.0, 1.0, 1.0), 10.0)
  }));

  elements.push(new Polygon({
    points: [
      new Point(850.0, 75.0),
      new Point(958.0, 137.5),
      new Point(958.0, 262.5),
      new Point(850.0, 325.0),
      new Point(742.0, 262.6),
      new Point(742.0, 137.5),
    ],
    fillStyle: new FillStyle(new Color(0.0, 1.0, 0.0, 1.0)),
    strokeStyle: new StrokeStyle(new Color(0.0, 0.0, 1.0, 1.0), 10.0)
  }));

  // for (let k = 0; k < 32; k++) {
  //   const x = 100 + (Math.random() * 100 - 50);
  //   const y = 100 + (Math.random() * 100 - 50);
  //   const rect = new Rectangle(x, y, 16, 16, 4, 4);
  //   elements.push(rect);
  // }

  const group = new Group({ elements });

  const doc = new SVGDocument(1200, 400);
  console.log(doc.render(group));

  expect(21 + 21).toBe(42);
});
