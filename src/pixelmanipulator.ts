
import { create, all } from 'mathjs';
const math = create(all) as math.MathJsStatic;

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
    const x1 = math.floor(x);
    const y1 = math.floor(y);
    let ri = y * (this.w * 4) + x * 4;
    let r = this.pixels[ri];
    let g = this.pixels[ri + 1];
    let b = this.pixels[ri + 2];
    let a = this.pixels[ri + 3];
    // return math.matrix([r, g, b, a]);
    return [r, g, b, a]
  }

  pixel_h() {

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
  interpolatedPixel(x: number, y: number) {
    // for now, just floor the coords.
    // return this.pixel(math.floor(x), math.floor(y));
  }
}