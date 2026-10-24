
const water = [2.5, 1.2, 3.4, 1.8, 1.4, 2.7, 3.2];

function findMax(arr)
{
    let max = arr[0];

    for (let i = 1; i < arr.length; i++)
        if (arr[i] > max) max = arr[i];

    return max;
}


function filterWater(arr) 
{
    return arr.filter(value => value > 3);
}

function sumWater(arr)
{
    let sum = 0;

    for (let i = 0; i < arr.length; i++) sum += arr[i];

    return sum;
}

function analyzeWater(arr)
{
    let lowDays = 0;
    let i = 0;

    while (i < arr.length) {
        if (arr[i] <= 1.5) lowDays++;
        i++;
    }

    const lowPercent = lowDays / arr.length * 100;
    const average = sumWater(arr) / arr.length;

    return {
        lowDays: lowDays,
        lowPercent: lowPercent,
        average: average
    };
}

function showResults(arr)
{
    const name = prompt("Введите ваше имя:");

    if (name === null || name.trim() === "") {
        alert("Имя не введено.");
        return;
    }

    alert("Привет, " + name + "!");

    const total = sumWater(arr);
    const max = findMax(arr);
    const highDays = filterWater(arr);
    const analysis = analyzeWater(arr);

    console.log("Пользователь:", name);
    console.log("Потребление воды за каждый день:", arr);
    console.log("Общее потребление за неделю:", total.toFixed(2), "л");
    console.log("Максимальное потребление за день:", max, "л");
    console.log("Дни с потреблением более 3 литров:", highDays);
    console.log("Количество дней с низким потреблением:", analysis.lowDays);
    console.log("Процент дней с низким потреблением:", analysis.lowPercent.toFixed(2) + "%");
    console.log("Среднее потребление за день:", analysis.average.toFixed(2), "л");

    if (analysis.average < 2)
        console.log("Рекомендуется увеличить потребление воды до 2–2,5 литров в день");

    alert("За неделю вы выпили " + total.toFixed(2) + " литров воды, в " + highDays.length + " днях потребление было более 3 литров.");
}

showResults(water);
