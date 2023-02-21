let x;
let y;
let r = 3 * x - y >= 2;
let s = 3 * y - x >= 6;
let z = -5 * x - 7 * y >= -35;
let v = 2 * x - y >= 4;
let w = 7 * y - 2 * x >= 4;
let b = r + s >= 2;
let a = z + v + w >= 3;
let c = 2 * a - b >= 2;
for (let x = 0; x < 1000; x = x + 0.1) {
    for (let y = 0; y < 1000; y = y + 0.1) {
        let b = 0;
        let a = 0;
        let c;
        let r = 3 * x - y >= 2;
        let s = 3 * y - x >= 6;
        let z = -5 * x - 7 * y >= -35;
        let v = 2 * x - y >= 4;
        let w = 7 * y - 2 * x >= 4;
        if (r && s) {
            b = 1;
        }
        if (z && v && w) {
            a = 1;
        }
        if (a === 1 && b === 0) {
            c = 1;
            console.log("x: " + Number(x).toFixed(1) + " y: " + Number(y).toFixed(1));
        }
    }
}


