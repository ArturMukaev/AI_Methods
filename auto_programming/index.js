let a = 6;
let b = 2;
let c = 3.5;
let d;
let m;
let h;
let S;
let P;
let d1;
let d2;
let cornerA = 90;
let cornerB = 45;

//  Счетчик шагов
let count = 1;
// Достаем математические операции
const {sqrt, pow, sin, cos, PI, asin} = Math;

// Пока не найдем все переменные проходим цикл
while (!a || !b || !c || !d ||
    !m || !h || !S || !P || !d1 ||
    !d2 || !cornerA || !cornerB) {
    
    console.log("Шаг " + count + ":");

    // Ищем a
    if (b && c && cornerA && d && cornerB && !a) {
        a = b + c * cos(cornerA * PI / 180) + d * cos(cornerB * PI / 180);
        console.log("a = " + a);
    }
    if (m && b && !a) {
        a = 2 * m - b;
        console.log("a = " + a);
    }
    // Ищем b
    if (m && a && !b) {
        b = 2 * m - a;
        console.log("b = " + b);
    }
    if (a && c && cornerA && d && cornerB && !b) {
        b = a - c * cos(cornerA * PI / 180) - d * cos(cornerB * PI / 180);
        console.log("b = " + b);
    }
    // Ищем c
    if (h && cornerA && !c) {
        c = h / sin(cornerA * PI / 180);
        console.log("c = " + c);
    }
    // Ищем d
    if (h && cornerB && !d) {
        d = h / sin(cornerB * PI / 180);
        console.log("d = " + d);
    }
    // Ищем m
    if (a && b && !m) {
        m = (a + b) / 2;
        console.log("m = " + m);
    }
    if (S && h && !m) {
        m = S / h;
        console.log("m = " + m);
    }
    // Ищем cornerB
    if (h && d && !cornerB) {
        cornerB = 180 * asin(h / d) / PI;
        console.log("cornerB = " + cornerB);
    }
    // Ищем cornerA
    if (h && c && !cornerA) {
        cornerA = 180 * asin(h / c) / PI;
        console.log("cornerA = " + cornerA);
    }
    // Ищем h
    if (S && a && b && !h) {
        h = 2 * S / (a + b);
        console.log("h = " + h);
    }
    if (c && cornerA && !h) {
        h = c * sin(cornerA * PI / 180);
        console.log("h = " + h);
    }
    if (d && cornerB && !h) {
        h = d * sin(cornerB * PI / 180);
        console.log("h = " + h);
    }
    if (S && m && !h) {
        h = S / m;
        console.log("h = " + h);
    }
    // Ищем S
    if (m && h && !S) {
        S = m * h;
        console.log("S = " + S);
    }
    if (a && b && h && !S) {
        S = (a + b) / 2 * h;
        console.log("S = " + S);
    }
    // Ищем d1
    if (a && d && cornerB && !d1) {
        d1 = sqrt(pow(a, 2) + pow(d, 2) - 2 * a * d * cos(cornerB * PI / 180));
        console.log("d1 = " + d1);
    }
    // Ищем d2
    if (a && c && cornerA && !d2) {
        d2 = sqrt(pow(a, 2) + pow(c, 2) - 2 * a * c * cos(cornerA * PI / 180));
        console.log("d2 = " + d2);
    }
    // Ищем P
    if (a && b && c && d && !P) {
        P = a + b + c + d;
        console.log("P = " + P);
    }
    count++;
}