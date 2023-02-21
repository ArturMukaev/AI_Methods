// Массив с исходными данными
let data = [
    [1,1,1,1,1],
    [2,1,1,0,1],
    [3,1,0,1,0],
    [4,1,0,0,0],
    [5,0,1,1,1],
    [6,0,0,0,1],
    [7,0,0,0,1],
    [8,0,0,0,1],
];

// Массив признаков
const attributeMass = [
    [0, 1],
    [0, 1],
    [0, 1],
];

// Перевод признаков
const attributeInfo = {
    0: "Пришли из-за голода?",
    1: "Хотите что то вкусное?",
    2: "Вы увидели на витрине",
}


// Функция для получения логарифма из y по основанию x
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

// Функция для подсчета неопределенности ветви
function getResult(attributeRow, attributeValue) {
    let attributeUncertainty = 0;
    let endOfBranch;
    let rowsToDelete = [];
    // Выбираем всех, кто подходит под данное значение признака
    const chosenData = data.filter((dataRow) => dataRow[attributeRow + 1] === attributeValue);
    console.dir(chosenData);
    if (chosenData.length === 0 ) return {
        uncertainty: 0,
        amount: 0,
        rowsToDelete,
    };;
    // Для каждого выходного Y считаем информативность
    for (let i = 0; i < 2; i++) {
        // Смотрим сколько строк из таблицы с данными имеет определенный Y
        const dataWithY = chosenData.filter((dataRow) => dataRow[4] === i);
        // Вероятность
        const p = dataWithY.length / chosenData.length;
        if (p === 1) {
            for (const element of dataWithY) {
                rowsToDelete.push(element[0]);
            }
            endOfBranch = i;
        }
        // Прибавляем к неопределенности ветви
        if (p !== 0) {
            attributeUncertainty += p * getBaseLog(2, p);
        }
    }
    if (endOfBranch) {
        console.log(`В признаке ${attributeInfo[attributeRow]} в ветке ${attributeValue} конец.`)
    }
    return {
        uncertainty: -1 * attributeUncertainty,
        amount: chosenData.length,
        rowsToDelete,
    };
}

// Функция для построения дерева
function buildTree() {
    // Задаем максимальную энтропию, чтобы потом с ней сравнивать
    let min = {value: Infinity, attribute: '', numbersToDelete: []};
    // Массив для хранения энтропий признаков
    let valueList = [];
    // Пробегаемся по признакам
    for (let i = 0; i < attributeMass.length; i++) {

        // Задаем неопределенность признака
        let uncertainty = 0;
        // Задаем массив строк, которые нашли свой конец
        let localNumbersTODelete = [];

        // Считаем неопределенность для каждой ветви
        for (const attributeValue of attributeMass[i]) {
            const result = getResult(i, attributeValue);
            uncertainty += result.amount / data.length * result.uncertainty;
            localNumbersTODelete.push(...result.rowsToDelete);
        }
        valueList.push(uncertainty);
        console.log(`У признака ${attributeInfo[i]} неопределенность равна ${uncertainty}`)

        if (uncertainty < min.value) {
            min.value = uncertainty;
            min.attribute = i;
            min.numbersToDelete = [...localNumbersTODelete];
        }

    }
    console.log(`min {${valueList.join()}} = ${min.value}`);
    console.log(`Выбираем в качестве узла вершину ${attributeInfo[min.attribute]} `);
    console.log(`Нашли свой конец строки номер ${min.numbersToDelete.join()}`)
}

buildTree();

