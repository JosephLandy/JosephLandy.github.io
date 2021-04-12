export type Color = [number, number, number, number];

// linearly interpolate between 2 points.
function interpolate(f: number, P1: number[], P2: number[]) {
  return P1.map((v, i) => (1 - f) * v + f * P2[i]);
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
    return [r, g, b, a];
  }

  setPixel(x: number, y: number, v: Color) {
    let ri = y * (this.w * 4) + x * 4;
    let [r, g, b, a] = v;
    this.pixels[ri] = r;
    this.pixels[ri + 1] = g;
    this.pixels[ri + 2] = b;
    this.pixels[ri + 3] = a;
  }

  // get an interpolated pixel, at non integer indices.
  interpolatedPixel(x: number, y: number): Color {
    // integer portion of coordinate.
    let x1 = Math.floor(x);
    let y1 = Math.floor(y);
    // next integer indices over.
    let x2 = x1 + 1;
    let y2 = y1 + 1;
    // float part of coordinate.
    let xf = x - x1;
    let yf = y - y1;
    // integer pixels needed:
    // Q11 Q21
    // Q12 Q22
    let Q11 = this.pixel(x1, y1);
    let Q21 = this.pixel(x2, y1);
    let Q12 = this.pixel(x1, y2);
    let Q22 = this.pixel(x2, y2);

    // First we calculate the linear interpolation at both points along 1 axis.
    // lets do X direction first
    // Ix1 = (1 - xf) * Q11 + xf * Q21
    let Ix1 = interpolate(xf, Q11, Q21);
    let Ix2 = interpolate(xf, Q12, Q22);

    // Now interpolate in the Y direction
    let P = interpolate(yf, Ix1, Ix2);

    // Make sure these are integer values less than 255, to put them in the typed array.
    P = P.map(v => {
      let z = Math.round(v);
      if (z > 255) {
        return 255;
      }
      return z;
    });
    // Need to make sure the alpha channel of the pixel is 255.
    // It should be anyway, but just in case. 
    P[3] = 255;
    return P as Color;
  }
}
