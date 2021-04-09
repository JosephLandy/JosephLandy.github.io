import { create, all, Matrix } from 'mathjs';
const math = create(all) as math.MathJsStatic;

type Color = [number, number, number, number];

function interpolate(f: number, P1: Matrix, P2: Matrix): Matrix {
  return math.add(math.multiply(1 - f, P1), math.multiply(f, P2)) as Matrix;
}

export default class PixelManipulator {
  w: number;
  h: number;
  pixels: Uint8ClampedArray;

  constructor(data: ImageData) {
    this.pixels = data.data;
    this.w = data.width;
    this.h = data.height;
  }

  pixel(x: number, y: number) {
    const x1 = Math.floor(x);
    const y1 = Math.floor(y);
    let ri = y1 * (this.w * 4) + x1 * 4;
    let r = this.pixels[ri];
    let g = this.pixels[ri + 1];
    let b = this.pixels[ri + 2];
    let a = this.pixels[ri + 3];
    // return math.matrix([r, g, b, a]);
    return [r, g, b, a];
  }

  setPixel(x: number, y: number, v: number[]) {
    let ri = y * (this.w * 4) + x * 4;
    // let X = v.toArray()[0]]
    let [r, g, b, a] = v;
    this.pixels[ri] = r;
    this.pixels[ri + 1] = g;
    this.pixels[ri + 2] = b;
    this.pixels[ri + 3] = a;
  }

  // get an interpolated pixel, at non integer indices.
  interpolatedPixel(x: number, y: number): Color {
    // for now, just floor the coords.
    // return this.pixel(math.floor(x), math.floor(y));
    // integer portion of coordinate.
    let x1 = Math.floor(x);
    let y1 = Math.floor(y);

    let x2 = x1 + 1;
    let y2 = y1 + 1;

    // float part of coordinate.
    let xf = x - x1;
    let yf = y - y1;
    // Q11 Q21
    // Q12 Q22
    // use vectors - should make it easier to interpolate.  // lets leave out the alpha chanel.
    let Q11 = math.matrix(this.pixel(x1, y1));
    let Q21 = math.matrix(this.pixel(x2, y1));
    let Q12 = math.matrix(this.pixel(x1, y2));
    let Q22 = math.matrix(this.pixel(x2, y2));

    // ok, so first we calculate the linear interpolation at both points along 1 axis.
    // lets do X direction first. call it Ix1 and Ix2
    // I think it's basically
    // Ix1 = (1 - xf) * Q11 + xf * Q21
    // let Ix1 = math.add(math.multiply(1 - xf, Q11), math.multiply(xf, Q21));
    // let Ix2 = math.add(math.multiply(1 - xf, Q12), math.multiply(xf, Q22));
    let Ix1 = interpolate(xf, Q11, Q21);
    let Ix2 = interpolate(xf, Q12, Q22);

    // Now interpolate in the Y direction

    // I need to make sure these are integer values less than 255, to put them in the typed array.
    let P = math.round(interpolate(yf, Ix1, Ix2)).toArray() as number[];

    P = P.map(v => (v > 255 ? 255 : v));

    // at the end, I need to make sure the alpha channel of the pixel is 255.
    P[3] = 255;
    return P as Color;
  }
}
