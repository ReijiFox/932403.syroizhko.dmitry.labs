const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"))
app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", function(req, res)
{
    res.sendFile(__dirname + "/public/about.html");
});

app.listen(PORT, function()
{
    console.log("Сервер запущен: http://localhost:" + PORT);
});


// Конвертация валют
app.get("/api/convert", function(req, res){
    const from = req.query.from;
    const to = req.query.to;
    const amount = Number(req.query.amount);

    const currencies = ["USD", "EUR", "RUB"];

    if (currencies.indexOf(from) === -1 || currencies.indexOf(to) === -1)
    {
        return res.status(400).json({error: "Неизвестная валюта"});
    }

    if (!Number.isFinite(amount) || amount <= 0)
    {
        return res.status(400).json({error: "Сумма должна быть положительным числом"})
    }

    const rates = {
        "USD_EUR": 0.92,
        "EUR_RUB": 105,
        "USD_RUB": 92
    };

    const rate = rates[from + "_" + to];

    if (rate === undefined)
    {
        return res.status(400).json({error: "Нет поддержки конвертации между данными валютами"});
    }

    const result = Number((amount * rate).toFixed(2));

    res.json({
        from: from,
        to: to,
        amount: amount,
        result: result,
        rate: rate
    });
});