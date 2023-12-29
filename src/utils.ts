import { zlibSync, unzlibSync, strToU8, strFromU8 } from 'fflate'

export function debounce(fn: Function, n = 100) {
  let handle: any
  return (...args: any[]) => {
    if (handle) clearTimeout(handle)
    handle = setTimeout(() => {
      fn(...args)
    }, n)
  }
}

export function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

export function atou(base64: string): string {
  const binary = atob(base64)

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)
    return strFromU8(unzipped)
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary))
}












//. IVE BEEN LOOKIN FOR THIS<S-F1>
////' lumionanse & contrast ratio function!!!:w
//:wq
//


/**:w
*
  *
{
    "api": 1,
    "name": "Contrasting Color",
    "description": "Determine whether black or white contrasts better with the given color(s) (one per line).",
    "author": "Sunny Walker",
    "icon": "color-wheel",
    "tags": "contrast,color,wcag"
}
**/

function main(input) {
  let lines = input.fullText.split("\n");
  let o = lines.map(c => betterColor(c));
  input.fullText = o.join("\n");
}

// convert #rrggbb into its integer r, g, b components
const hex2Rgb = hex => {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return rgb ? {
    r: parseInt(rgb[1], 16),
    g: parseInt(rgb[2], 16),
    b: parseInt(rgb[3], 16)
  } : null;
};

// calculate the luminance of a color
const luminance = hex => {
  var rgb = hex2Rgb(hex);
  var a = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return (v <= 0.03928) ? v / 12.92 : Math.pow(((v + 0.055) / 1.055), 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// calculate the contrast ratio between two colors
const contrast = (c1, c2) => {
  const l1 = luminance(c1) + .05;
  const l2 = luminance(c2) + .05;
  let ratio = l1 / l2;
  if (l2 > l1) {
    ratio = 1 / ratio;
  }
  return Math.floor(ratio * 100) / 100;
};

// convert #rbg to #rrggbb
const normalizeHex = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, '#$1$1$2$2$3$3');

// determine the WCAG 2.0 contrast ratio level
const wcagLevel = ratio => ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'fail';

// determine the better contrasting color for a color
const betterColor = hex => {
  const h = normalizeHex(hex);
  if (!h.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)) {
    return hex;
  }
  var w = contrast(h, '#ffffff');
  var b = contrast(h, '#000000');
  var r = Math.max(w, b);
  return hex + ' // contrasts best with ' + (w > b ? '#fff' : '#000') + ' with a ratio of ' + r + ' to 1; WCAG 2.0: ' + wcagLevel(r);
};
