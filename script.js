function findMax(arr)
{
    if (arr.length == 0) return null;

    let max = arr[0];

    for (let i = 1; i < arr.length; i++)
        if (arr[i] > max) max = arr[i];

    return max;
}

function filterWater(arr)
{
    return arr.filter(function (value)
    {
        return value > 3;
    });
}

function sumWater(arr)
{
    let sum = 0;

    for (let i = 0; i < arr.length; i++)
        sum += arr[i];

    return sum;
}

let username = prompt("Введите ваше имя: ");

if (username !== null && username.trim() !== "")
{
    username = username.trim();
    alert("Здравствуй, " + username + "!");
    console.log("Имя пользователя: " + username);
}
else console.log("Имя не введено");



let water = [2.1, 1.5, 1.6, 3.1, 3.4, 1.1, 3.0];
console.log("Потребление воды за неделю: ", water);



let maxWater = findMax(water);
let highWater = filterWater(water);
let total = sumWater(water);

console.log("Максимальное потребление в день: ", maxWater, " литров");
console.log("Потребление более 3 литров: ", highWater);
console.log("Дней с потреблением сверх нормы: ", highWater.length);
console.log("Потребление за неделю: ", total.toFixed(2), " литров");


let lowDays = 0;
let i = 0;

while (i < water.length)
{
    if (water[i] <= 1.5)
    {
        lowDays++

        console.log("Низкое потребление: день ", i + 1, " - ", water[i], " литров")
    }

    i++;
}

let lowPerc = lowDays/water.length * 100;

console.log("Дней с низким потреблением: ", lowDays);
console.log("Процент дней с низким потреблением : ", lowPerc.toFixed(2) + "%");


let avgWater = total/water.length;

console.log("Среднее потребление: ", avgWater.toFixed(2), " литров в день" );


if (avgWater < 2) console.log("Рекомендуется увеличить потребление воды до 2-2.5 литров в день");
else console.log("Среднее потребление воды не переходит нижний предел в 2 литра в день");


alert("За неделю выпито " + total.toFixed(2) + " литров воды, в " + highWater.length + " днях норма была превышена.");