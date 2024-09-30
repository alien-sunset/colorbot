let rand = function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

let h1 = 0,
  h2 = 0,
  h3 = 0,
  h4 = 0,
  h5 = 0;

let hueSeed = rand(0, 360);
let hueRange = rand(1, 10);

let generateHues = function () {
  if (hueRange == 1) {
    (h1 = hueSeed - 130),
      (h2 = hueSeed - 110),
      (h3 = hueSeed),
      (h4 = hueSeed + 110),
      (h5 = hueSeed + 130);
  } //triadic
  if (hueRange == 2) {
    (h1 = hueSeed + 130),
      (h2 = hueSeed + 110),
      (h3 = hueSeed),
      (h4 = hueSeed - 110),
      (h5 = hueSeed - 130);
  } //triadic
  if (hueRange == 3) {
    (h1 = hueSeed + 60),
      (h2 = hueSeed + 35),
      (h3 = hueSeed),
      (h4 = hueSeed - 35),
      (h5 = hueSeed - 60);
  } //analogous
  if (hueRange == 4) {
    (h1 = hueSeed - 60),
      (h2 = hueSeed - 35),
      (h3 = hueSeed),
      (h4 = hueSeed + 35),
      (h5 = hueSeed + 60);
  } //analogous
  if (hueRange == 5) {
    (h1 = hueSeed + 190),
      (h2 = hueSeed + 170),
      (h3 = hueSeed),
      (h4 = hueSeed - 20),
      (h5 = hueSeed - 40);
  } //complimentary
  if (hueRange == 6) {
    (h1 = hueSeed - 40),
      (h2 = hueSeed - 20),
      (h3 = hueSeed),
      (h4 = hueSeed + 170),
      (h5 = hueSeed + 190);
  } //complimentary
  if (hueRange == 7) {
    (h1 = hueSeed + 30),
      (h2 = hueSeed + 15),
      (h3 = hueSeed),
      (h4 = hueSeed - 15),
      (h5 = hueSeed - 30);
  } //mono
  if (hueRange == 8) {
    (h1 = hueSeed - 30),
      (h2 = hueSeed - 15),
      (h3 = hueSeed),
      (h4 = hueSeed + 15),
      (h5 = hueSeed + 30);
  } //mono
  if (hueRange == 9) {
    (h1 = hueSeed + 145),
      (h2 = hueSeed + 70),
      (h3 = hueSeed),
      (h4 = hueSeed - 70),
      (h5 = hueSeed - 145);
  } //rainbow
  if (hueRange == 10) {
    (h1 = hueSeed - 145),
      (h2 = hueSeed - 70),
      (h3 = hueSeed),
      (h4 = hueSeed + 70),
      (h5 = hueSeed + 145);
  } //rainbow

  return h1, h2, h3, h4, h5;
};

let hueFix = function () {
  if (h1 < 0) {
    h1 = h1 + 361;
  }
  if (h1 > 360) {
    h1 = h1 - 361;
  }
  if (h2 < 0) {
    h2 = h2 + 361;
  }
  if (h2 > 360) {
    h2 = h2 - 361;
  }
  if (h4 < 0) {
    h4 = h4 + 361;
  }
  if (h4 > 360) {
    h4 = h4 - 361;
  }
  if (h5 < 0) {
    h5 = h5 + 361;
  }
  if (h5 > 360) {
    h5 = h5 - 361;
  }

  return h1, h2, h4, h5;
};

let sata = 0,
  satb = 0,
  satc = 0,
  satd = 0,
  sate = 0;

let satSeed = rand(1, 22);

const genrateSaturations = function () {
  if (satSeed == 1) {
    (sata = 95), (satb = 95), (satc = 95), (satd = 95), (sate = 95);
  }
   if (satSeed == 2) {
    (sata = 85), (satb = 85), (satc = 85), (satd = 85), (sate = 85);
  } 
  if (satSeed == 3) {
    (sata = 75), (satb = 75), (satc = 75), (satd = 75), (sate = 75);
  }
  if (satSeed == 4) {
    (sata = 66), (satb = 66), (satc = 66), (satd = 66), (sate = 66);
  }
  if (satSeed == 5) {
    (sata = 50), (satb = 50), (satc = 50), (satd = 50), (sate = 50);
  }
  if (satSeed == 6) {
    (sata = 40), (satb = 40), (satc = 40), (satd = 40), (sate = 40);
  }
  if (satSeed == 7) {
    (sata = 30), (satb = 30), (satc = 30), (satd = 30), (sate = 30);
  }
  if (satSeed == 8) {
    (sata = 20), (satb = 20), (satc = 20), (satd = 20), (sate = 20);
  }
  if (satSeed == 9) {
    (sata = 30), (satb = 40), (satc = 50), (satd = 60), (sate = 70);
  }
  if (satSeed == 10) {
    (sata = 70), (satb = 60), (satc = 50), (satd = 40), (sate = 30);
  }
  if (satSeed == 11) {
    (sata = 33), (satb = 50), (satc = 70), (satd = 50), (sate = 33);
  }
  if (satSeed == 12) {
    (sata = 33), (satb = 70), (satc = 50), (satd = 70), (sate = 33);
  }
  if (satSeed == 13) {
    (sata = 50), (satb = 70), (satc = 33), (satd = 70), (sate = 50);
  }
  if (satSeed == 14) {
    (sata = 50), (satb = 33), (satc = 70), (satd = 33), (sate = 50);
  }
  if (satSeed == 15) {
    (sata = 70), (satb = 50), (satc = 33), (satd = 50), (sate = 70);
  }
  if (satSeed == 16) {
    (sata = 70), (satb = 33), (satc = 50), (satd = 33), (sate = 70);
  }
  if (satSeed == 17) {
    (sata = 30), (satb = 40), (satc = 50), (satd = 40), (sate = 30);
  }
  if (satSeed == 18) {
    (sata = 30), (satb = 50), (satc = 40), (satd = 50), (sate = 30);
  }
  if (satSeed == 19) {
    (sata = 40), (satb = 30), (satc = 50), (satd = 30), (sate = 40);
  }
  if (satSeed == 20) {
    (sata = 40), (satb = 50), (satc = 30), (satd = 50), (sate = 40);
  }
  if (satSeed == 21) {
    (sata = 50), (satb = 40), (satc = 30), (satd = 40), (sate = 50);
  }
  if (satSeed == 22) {
    (sata = 50), (satb = 30), (satc = 40), (satd = 30), (sate = 50);
  }
  if (satSeed == 23) {
    (sata = 50), (satb = 60), (satc = 70), (satd = 60), (sate = 50);
  }
  if (satSeed == 24) {
    (sata = 50), (satb = 70), (satc = 60), (satd = 70), (sate = 50);
  }
  if (satSeed == 25) {
    (sata = 60), (satb = 50), (satc = 70), (satd = 50), (sate = 60);
  }
  if (satSeed == 26) {
    (sata = 60), (satb = 70), (satc = 50), (satd = 70), (sate = 60);
  }
  if (satSeed == 27) {
    (sata = 70), (satb = 60), (satc = 50), (satd = 60), (sate = 70);
  }
  if (satSeed == 28) {
    (sata = 70), (satb = 50), (satc = 60), (satd = 50), (sate = 70);
  }
  if (satSeed == 29) {
    (sata = 95), (satb = 85), (satc = 77), (satd = 66), (sate = 55);
  }
  if (satSeed == 30) {
    (sata = 55), (satb = 66), (satc = 75), (satd = 85), (sate = 95);
  }
  if (satSeed == 31) {
    (sata = 75), (satb = 85), (satc = 95), (satd = 85), (sate = 75);
  }
  if (satSeed == 32) {
    (sata = 75), (satb = 95), (satc = 85), (satd = 95), (sate = 75);
  }
  if (satSeed == 33) {
    (sata = 85), (satb = 95), (satc = 75), (satd = 95), (sate = 85);
  }
  if (satSeed == 34) {
    (sata = 85), (satb = 75), (satc = 95), (satd = 75), (sate = 85);
  }
  if (satSeed == 35) {
    (sata = 95), (satb = 85), (satc = 75), (satd = 85), (sate = 95);
  }
  if (satSeed == 36) {
    (sata = 95), (satb = 75), (satc = 85), (satd = 75), (sate = 95);
  }

  return sata, satb, satc, satd, sate;
};

let lita = 0,
  litb = 0,
  litc = 0,
  litd = 0,
  lite = 0;

let litSeed = rand(1, 28);

const genrateLightnesses = function () {
  if (litSeed == 1) {
    (lita = 85), (litb = 85), (litc = 85), (litd = 85), (lite = 85);
  }
  if (litSeed == 2) {
    (lita = 75), (litb = 75), (litc = 75), (litd = 75), (lite = 75);
  }
  if (litSeed == 3) {
    (lita = 66), (litb = 66), (litc = 66), (litd = 66), (lite = 66);
  }
  if (litSeed == 4) {
    (lita = 50), (litb = 50), (litc = 50), (litd = 50), (lite = 50);
  }
  if (litSeed == 5) {
    (lita = 40), (litb = 40), (litc = 40), (litd = 40), (lite = 40);
  }
  if (litSeed == 6) {
    (lita = 30), (litb = 30), (litc = 30), (litd = 30), (lite = 30);
  }
  if (litSeed == 7) {
    (lita = 40), (litb = 50), (litc = 60), (litd = 70), (lite = 80);
  }
  if (litSeed == 8) {
    (lita = 80), (litb = 70), (litc = 60), (litd = 50), (lite = 40);
  }
  if (litSeed == 9) {
    (lita = 80), (litb = 66), (litc = 50), (litd = 66), (lite = 80);
  }
  if (litSeed == 10) {
    (lita = 80), (litb = 50), (litc = 66), (litd = 50), (lite = 80);
  }
  if (litSeed == 11) {
    (lita = 66), (litb = 80), (litc = 50), (litd = 80), (lite = 66);
  }
  if (litSeed == 12) {
    (lita = 66), (litb = 50), (litc = 80), (litd = 50), (lite = 66);
  }
  if (litSeed == 13) {
    (lita = 50), (litb = 66), (litc = 80), (litd = 66), (lite = 50);
  }
  if (litSeed == 14) {
    (lita = 50), (litb = 80), (litc = 66), (litd = 80), (lite = 50);
  }
  if (litSeed == 15) {
    (lita = 80), (litb = 70), (litc = 60), (litd = 70), (lite = 80);
  }
  if (litSeed == 16) {
    (lita = 80), (litb = 60), (litc = 70), (litd = 60), (lite = 80);
  }
  if (litSeed == 17) {
    (lita = 70), (litb = 60), (litc = 80), (litd = 60), (lite = 70);
  }
  if (litSeed == 18) {
    (lita = 70), (litb = 80), (litc = 60), (litd = 80), (lite = 70);
  }
  if (litSeed == 19) {
    (lita = 60), (litb = 70), (litc = 80), (litd = 70), (lite = 60);
  }
  if (litSeed == 20) {
    (lita = 60), (litb = 80), (litc = 70), (litd = 80), (lite = 60);
  }
  if (litSeed == 21) {
    (lita = 20), (litb = 30), (litc = 40), (litd = 50), (lite = 60);
  }
  if (litSeed == 22) {
    (lita = 60), (litb = 50), (litc = 40), (litd = 30), (lite = 20);
  }
  if (litSeed == 23) {
    (lita = 30), (litb = 40), (litc = 50), (litd = 40), (lite = 30);
  }
  if (litSeed == 24) {
    (lita = 30), (litb = 50), (litc = 40), (litd = 50), (lite = 30);
  }
  if (litSeed == 25) {
    (lita = 40), (litb = 50), (litc = 30), (litd = 50), (lite = 40);
  }
  if (litSeed == 26) {
    (lita = 40), (litb = 30), (litc = 50), (litd = 30), (lite = 40);
  }
  if (litSeed == 27) {
    (lita = 50), (litb = 40), (litc = 30), (litd = 40), (lite = 50);
  }
  if (litSeed == 28) {
    (lita = 50), (litb = 30), (litc = 40), (litd = 30), (lite = 50);
  }
  if (litSeed == 29) {
    (lita = 40), (litb = 50), (litc = 60), (litd = 50), (lite = 40);
  }
  if (litSeed == 30) {
    (lita = 40), (litb = 60), (litc = 50), (litd = 60), (lite = 40);
  }
  if (litSeed == 31) {
    (lita = 50), (litb = 40), (litc = 60), (litd = 40), (lite = 50);
  }
  if (litSeed == 32) {
    (lita = 50), (litb = 60), (litc = 40), (litd = 60), (lite = 50);
  }
  if (litSeed == 33) {
    (lita = 60), (litb = 50), (litc = 40), (litd = 50), (lite = 60);
  }
  if (litSeed == 34) {
    (lita = 60), (litb = 40), (litc = 50), (litd = 40), (lite = 60);
  }
  if (litSeed == 35) {
    (lita = 70), (litb = 60), (litc = 50), (litd = 60), (lite = 70);
  }
  if (litSeed == 36) {
    (lita = 70), (litb = 50), (litc = 60), (litd = 50), (lite = 70);
  }
  if (litSeed == 37) {
    (lita = 60), (litb = 70), (litc = 50), (litd = 70), (lite = 60);
  }
  if (litSeed == 38) {
    (lita = 60), (litb = 50), (litc = 70), (litd = 50), (lite = 60);
  }
  if (litSeed == 39) {
    (lita = 50), (litb = 60), (litc = 70), (litd = 60), (lite = 50);
  }
  if (litSeed == 40) {
    (lita = 50), (litb = 70), (litc = 60), (litd = 70), (lite = 50);
  }

  return lita, litb, litc, litd, lite;
};

generateHues();
hueFix();
genrateSaturations();
genrateLightnesses();

let hslToHex = function (h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

let hexCola = hslToHex(h1, sata, lita);
let hexColb = hslToHex(h2, satb, litb);
let hexColc = hslToHex(h3, satc, litc);
let hexCold = hslToHex(h4, satd, litd);
let hexCole = hslToHex(h5, sate, lite);

console.log(`"hueRange: ${hueRange}"`);
console.log("h1, h2, h3, h4, h5");
console.log(h1, h2, h3, h4, h5);
console.log(`"satSeed: ${satSeed}"`);
console.log(`"litSeed: ${litSeed}"`);
console.log(hexCola, hexColb, hexColc, hexCold, hexCole);

let hexToRgb = function (hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

let rgbToStr = function (rgb) {
  return rgb["r"] + " " + rgb["g"] + " " + rgb["b"];
};

let getContrastingColor = function (rgb) {
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 125
    ? "black"
    : "white";
};

let altText = `a block of five color swatches with Hex values of ${hexCola}, ${hexColb}, ${hexColc}, ${hexCold}, and ${hexCole}`;

console.log(`"altText: ${altText}"`);

let vertPaletteTable = `<div id="vertPalette" role="img" aria-label="${altText}" style="width:225px;height:175px;display:inline-block;text-align:center;font-family:Trebuchet MS;font-size:0.7em;"><title>${altText}</title><div style="width:45px;height:175px;display:inline-block;background-color:${hexCola};color:${getContrastingColor(
  hexToRgb(hexCola)
)};padding:5px 0;">${hexCola}</div><div style="width:45px;height:175px;display:inline-block;background-color:${hexColb};color:${getContrastingColor(
  hexToRgb(hexColb)
)};padding:5px 0;">${hexColb}</div><div style="width:45px;height:175px;display:inline-block;background-color: ${hexColc};color:${getContrastingColor(
  hexToRgb(hexColc)
)};padding:5px 0;"> ${hexColc}</div><div style="width:45px;height:175px;display:inline-block;background-color:${hexCold};color:${getContrastingColor(
  hexToRgb(hexCold)
)};padding:5px 0;">${hexCold}</div><div style="width:45px;height:175px;display:inline-block;background-color:${hexCole};color:${getContrastingColor(
  hexToRgb(hexCole)
)};padding:5px 0;">${hexCole}</div></div>`;

let horizPaletteTable = `<div id="horizPalette" role="img" aria-label="${altText}" style="width:200px;height:150px;display:inline-block;text-align:center;font-family:Trebuchet MS;"><title>${altText}</title><div style="box-sizing:border-box;height:30px;width:200px;background-color:${hexCola};color:${getContrastingColor(
  hexToRgb(hexCola)
)};padding:3px 0;">${hexCola}</div><div style="box-sizing:border-box;height:30px;width:200px;background-color:${hexColb};color:${getContrastingColor(
  hexToRgb(hexColb)
)};padding:3px 0;">${hexColb}</div><div style="box-sizing:border-box;height:30px;width:200px;background-color:${hexColc};color:${getContrastingColor(
  hexToRgb(hexColc)
)};padding:3px 0;">${hexColc}</div><div style="box-sizing:border-box;height:30px;width:200px;background-color:${hexCold};color:${getContrastingColor(
  hexToRgb(hexCold)
)};padding:3px 0;">${hexCold}</div><div style="box-sizing:border-box;height:30px;width:200px;background-color:${hexCole};color:${getContrastingColor(
  hexToRgb(hexCole)
)};padding:3px 0;">${hexCole}</div>`;

let imageTable = `<div id="showImage" role="img" aria-label="${altText}" style="width:250px;height:200px;display:inline-block;text-align:center;font-family:Trebuchet MS;"><title${altText}</title><div><div></div></div></div>`;

document.getElementById("vertPaletteSpot").innerHTML = vertPaletteTable;
document.getElementById("horizPaletteSpot").innerHTML = horizPaletteTable;
document.getElementById("imageSpot").innerHTML = imageTable;

const btnNew = document.getElementById("new");
btnNew.addEventListener("click", function () {
  {
    window.location.reload();
  }
});
const btnHoriz = document.getElementById("makeHorizImg");
btnHoriz.addEventListener("click", function () {
  {
    makeHorizPaletteImg();
  }
});
const btnVert = document.getElementById("makeVertImg");
btnVert.addEventListener("click", function () {
  {
    makeVertPaletteImg();
  }
});

//  https://github.com/tsayen/dom-to-image (<script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js" integrity="sha512-wUa0ktp10dgVVhWdRVfcUO4vHS0ryT42WOEcXjVVF2+2rcYBKTY7Yx7JCEzjWgPV+rj2EDUr8TwsoWF6IoIOPg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>)

let makeHorizPaletteImg = function () {
  let node = document.getElementById("horizPalette");
  let scale = 500 / node.offsetWidth;
  domtoimage
    .toPng(node, {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      },
    })

    .then(function (dataUrl) {
      let horizPaletteImg = new Image();
      horizPaletteImg.setAttribute("height", 160);
      horizPaletteImg.setAttribute("width", 200);
      horizPaletteImg.src = dataUrl;
      horizPaletteImg.alt = `${altText}`;
      let divdoc = document.getElementById("showImage");
      if (divdoc.hasChildNodes()) {
        divdoc.removeChild(divdoc.lastChild);
      }
      divdoc.appendChild(horizPaletteImg);
    });
};

let makeVertPaletteImg = function () {
  let node = document.getElementById("vertPalette");
  let scale = 500 / node.offsetWidth;
  domtoimage
    .toPng(node, {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      },
    })

    .then(function (dataUrl) {
      let vertPaletteImg = new Image();
      vertPaletteImg.setAttribute("height", 160);
      vertPaletteImg.setAttribute("width", 200);
      vertPaletteImg.src = dataUrl;
      vertPaletteImg.alt = `${altText}`;
      let divdoc = document.getElementById("showImage");
      if (divdoc.hasChildNodes()) {
        divdoc.removeChild(divdoc.lastChild);
      }
      divdoc.appendChild(vertPaletteImg);
    });
};


const makesSvgImg = function() {//https://www.sitelint.com/blog/convert-svg-to-png-jpeg-or-webp-image-using-javascript-in-the-browser
    const svgBlob = new Blob([svgstring], {type: 'image/svg+xml'});
    const svgObjectUrl = globalThis.URL.createObjectURL(svgBlob);
    const img = document.createElement('img');
    const onImageLoaded = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const createdImage = document.createElement('img');
    canvas.setAttribute('width', 250);
    canvas.setAttribute('height', 200);
    context.drawImage(img, 0, 0);
    createdImage.src = canvas.toDataURL('image/png');
    };
    img.addEventListener('load', onImageLoaded);
    img.src = svgObjectUrl;
    return '<a href="${svgObjectUrl}" target="_blank" rel="noopener noreferrer"><img src="${svgObjectUrl}"alt="${alitText}"></a>'
  };
  //the original idea for the bot was to make an image from the SVG table since it didn't need outside script, and I could make and actual image and download link from it, which i couldn't figure out how to do with dom-to-image within the Perchance framework. but it turned out that that didn't work with the way the RSS was picking up the original generator. which is what started me on this whole journey of learning "proper" JavaScript (over just the Perchance based code) and making a real bot controlled all by me instead of relying on third party aggregators.
  
