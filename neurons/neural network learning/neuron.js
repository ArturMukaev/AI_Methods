// Для построения графиков
google.charts.load('current', {'packages': ['corechart']});

// Проинициализируем начальные значения
const step = 0.3;
let k1 = 0.3;
let k2 = 0.7;
let k3 = -0.2;
const reactions = [
    [1, 1, 1, 1],
    [9.4, 6.4, 1, -1],
    [2.5, 2.1, 1, 1],
    [8.0, 7.7, 1, -1],
    [0.5, 2.2, 1, 1],
    [7.9, 8.4, 1, -1],
    [7.0, 7.0, 1, -1],
    [2.8, 0.8, 1, 1],
    [1.2, 3.0, 1, 1],
    [7.8, 6.1, 1, -1],
    [6.8, 9, 1, -1],
    [2.6, 1, 1, 1],
];

// Функция, проверяющая, что ответит сеть на определенном шаге
// Возвращает значение, требуется переобучать сеть или нет
const countAnswer = function (stepNumber) {
    const stepArray = reactions[stepNumber];
    const S = k1 * stepArray[0] + k2 * stepArray[1] + k3 * stepArray[2];
    let net;
    if (S > 0) {
        net = 1;
    } else {
        net = -1;
    }
    if (net !== stepArray[3]) {
        return {net: net, y: stepArray[3]}
    }
    return null;
}

// Функция, переобучающая сеть
const studyAgain = function (stepNumber, net, y) {
    const stepArray = reactions[stepNumber];
    k1 = k1 + step * (y - net) * stepArray[0];
    k2 = k2 + step * (y - net) * stepArray[1];
    k3 = k3 + step * (y - net) * stepArray[2];
}

// Функция для получения точек для графика после перестройки
const getDot = function (knownDot) {
    return (-knownDot * k1 - k3) / k2;
}

// Сам алгоритм обучения
function startAlgorithm() {
    let errors;
    let epoch = 1;
    const dataForEpochChart = [["Эпоха", "Количество ошибок"]];
    const dataForKFCharts = [];
    let dataForKFChartResult;
    console.log(`Начальные значения коэффициентов: k1 = ${k1}, k2 = ${k2}, k3 = ${k3}`);
    console.log(`Шаг равен ${step}`);
    do {
        const dataForKFChartsLocal = [['x'], [20], [-20], []];
        console.log(`Эпоха ${epoch}:`);
        let localErrors = 0;
        for (let i = 0; i < reactions.length; i++) {
            console.log(`Шаг №${i + 1} в эпохе ${epoch}:`);
            const receivedAnswer = countAnswer(i);
            if (receivedAnswer) {
                localErrors++;
                studyAgain(i, receivedAnswer.net, receivedAnswer.y);
                const dot1 = getDot(20);
                const dot2 = getDot(-20);
                dataForKFChartsLocal[0].push((i + 1).toString());
                dataForKFChartsLocal[1].push(dot1);
                dataForKFChartsLocal[2].push(dot2);
                console.log(`Измененные значения коэффициентов: k1 = ${k1}, k2 = ${k2}, k3 = ${k3}`);
            } else {
                console.log("Значения коэффициентов изменять не требуется!");
            }
        }
        if (localErrors === 0) {
            const dot1 = getDot(20);
            const dot2 = getDot(-20);
            dataForKFChartResult = [['x','Итог'], [20, dot1], [-20, dot2], [epoch]];
        } else {
            dataForKFChartsLocal[3].push(epoch);
            dataForKFCharts.push(dataForKFChartsLocal);
        }
        dataForEpochChart.push([epoch, localErrors]);
        errors = localErrors;
        console.log(`Количество ошибок в эпохе ${epoch}: ${errors}`);
        epoch++;
    } while (errors !== 0);
    console.log("Математическая модель, выведенная сетью:");
    console.log(`S = ${Number(k1).toFixed(2)}*x1 + ${Number(k2).toFixed(2)}*x2 + ${Number(k3).toFixed(2)}*x3`);
    google.charts.setOnLoadCallback(() => {
        drawChart(dataForEpochChart)
        for (let epochArray of dataForKFCharts) {
            drawChart1(epochArray);
        }
        drawChart1(dataForKFChartResult);
    });
}

// Функция для отрисовки графика ошибок по эпохам
function drawChart(receivedData) {
    console.dir(receivedData);
    var data = google.visualization.arrayToDataTable(receivedData);

    var options = {
        title: 'Количество ошибок от номера эпохи',
        width: 1000,
        height: 600,
        hAxis: {
            title: 'Эпоха',
        },
        vAxis: {
            title: 'Количество ошибок',
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}

// Функция для отрисовки графика после перестроек
function drawChart1(receivedData) {
    console.dir(receivedData);
    const epoch = receivedData.pop();
    var data = google.visualization.arrayToDataTable(receivedData);

    var options = {
        title: `Положение разделяющего правила нейрона во время прохождения обучения эпохи ${epoch}`,
        width: 1000,
        height: 600,
        hAxis: {
            title: 'x1 (температура)',
            viewWindow: {
                max: 20,
                min: -20
            }
        },
        vAxis: {
            title: 'x2 (вибрация)',
            viewWindow: {
                max: 20,
                min: -20
            }
        },
    };

    var chart = new google.visualization.LineChart(document.getElementById(`curve_chart${epoch}`));

    chart.draw(data, options);
}

startAlgorithm();