// Исходная матрица
const matrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

// Наши исходные классы
const y1 = [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0];
const y2 = [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1, 0, 0, 0];
const y3 = [1, 1, 0.5, 1, 0.5, 1, 0, 0, 1, 0, 1, 0, 0];
const y4 = [0, 0.5, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0];
const y5 = [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0];
const y6 = [0.5, 1, 1, 1, 1, 0.5, 0, 0.5, 1, 0, 0, 0, 0];
const y7 = [0, 0, 0.5, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1];

// Массив классов
const yMas = [
    [...y1],
    [...y2],
    [...y3],
    [...y4],
    [...y5],
    [...y6],
    [...y7],
];

// Перевод наших классов
const yTranslation = {
    0: "Разновидности футбола",
    1: "Разновидности догонялок",
    2: "Разновидности хоккея",
    3: "Разновидности тенниса",
    4: "Разновидности игр с битой",
    5: "Разновидности командных игр с мячом касаниями рук",
    6: "Разновидности игр на поражение цели за меньшее количество ходов",
    7: "Баскетбол",
    8: "Боулинг",
    9: "Свободный мяч",
}

// Функция для умножения матриц
function MultiplyMatrix(A, B) {
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA !== rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++) {
        for (var i = 0; i < rowsA; i++) {
            var t = 0;
            for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
            C[i][k] = t;
        }
    }
    return C;
}

// Функция для обучения
function teachMatrix(matrix) {
    for (let i = 0; i < yMas.length; i++) {
        for (let h = 0; h < matrix.length; h++) {
            for (let j = 0; j < yMas.length; j++) {
                if (j === i) {
                    matrix[h][j] = matrix[h][j] + yMas[i][h];
                } else {
                    matrix[h][j] = matrix[h][j] - yMas[i][h];
                }

            }
        }
    }
    return matrix;
}

// Функция для экспертизы
function testMatrix(matrix, testThisToo) {
    const array = [...yMas, ...testThisToo];
    for (let i = 0; i < array.length; i++) {
        console.log(`Проверяем, к какому классу относится ${yTranslation[i]} :`);
        console.log("Результирующий вектор:");
        const result = MultiplyMatrix([[...array[i]]], matrix);
        console.dir(result[0].join());
        // Ищем максимальное число из результирующего вектора
        let max = {value: -Infinity, number: null};
        for (let j = 0; j < result[0].length; j++) {
            if (result[0][j] > max.value) {
                max.value = result[0][j];
                max.number = j;
            }
        }
        console.log(`Максимальное число из результирующего вектора = ${max.value}`);
        console.log(`Значит ${yTranslation[i]} относиться к классу ${yTranslation[max.number]}`);
    }
}

// Функция для копирования матрицы
function copyMatrix(matrix) {
    const newMatrix = [];
    for (const element of matrix) {
        newMatrix.push([...element]);
    }
    return newMatrix;
}

// Сам алгоритм с поэтапным обучением
function runAlgorithm() {
    // Выводим начальное значение матрицы
    console.log("Начальное значение матрицы:");
    console.dir(matrix);

    let matrix1 = copyMatrix(matrix);
    // Обучаем матрицу по всем классам один раз
    matrix1 = teachMatrix(matrix1);
    // Выводим значение матрицы после одного круга обучения
    console.log("Значение матрицы после круга обучения:");
    console.dir(matrix1);

    // Проводим экспертизу классов + добавляем на экспертизу новый класс - баскетбол
    const basketball = [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0];
    testMatrix(matrix1, [basketball]);

    let matrix2 = copyMatrix(matrix1);
    // Обучаем матрицу по всем классам второй раз
    matrix2 = teachMatrix(matrix2);
    // Выводим значение матрицы после второго круга обучения
    console.log("Значение матрицы после второго круга обучения:");
    console.dir(matrix2);

    // Проводим экспертизу классов второй раз + добавляем на экспертизу новый класс - боулинг
    const bowling = [0,0,1,1,1,0,0,0,1,0,0,0,1];
    const freeBall = [0,0,1,1,-1,0,0,0,1,1,0,0,0];
    testMatrix(matrix1, [basketball,bowling, freeBall]);
}

runAlgorithm();