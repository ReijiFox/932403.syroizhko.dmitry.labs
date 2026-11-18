




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



document.addEventListener("DOMContentLoaded", function () {
    const habitsSection = document.getElementById("habits");
    const addHabitButton = document.getElementById("add-habit");
    const resetButton = document.getElementById("reset-progress");
    const toggleHabitsButton = document.getElementById("toggle-habits");
    const themeButton = document.getElementById("theme-button");

    const habitsContainer = document.querySelector(".flex-cards");

    if (!habitsContainer) {
        console.error("Ошибка: контейнер с карточками привычек не найден.");
        return;
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark-theme");
            themeButton.textContent = "Светлая тема";
        }
    }

    function toggleTheme() {
        document.documentElement.classList.toggle("dark-theme");

        if (document.documentElement.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
            themeButton.textContent = "Светлая тема";
        } else {
            localStorage.setItem("theme", "light");
            themeButton.textContent = "Тёмная тема";
        }
    }

    function getHabits() {
        const cards = document.querySelectorAll(".habit-card");
        const habits = [];

        cards.forEach(function (card) {
            const title = card.querySelector("h3").textContent;
            const progress = card.querySelector(".progress");
            const value = parseInt(progress.style.width);

            habits.push({
                title: title,
                progress: value
            });
        });

        return habits;
    }

    function saveHabits() {
        const habits = getHabits();
        localStorage.setItem("habits", JSON.stringify(habits));
    }

    function createHabitCard(title, progressValue) {

        const card = document.createElement("article");
        card.classList.add("habit-card");

        const heading = document.createElement("h3");
        heading.textContent = title;

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        const progress = document.createElement("div");
        progress.classList.add("progress");
        progress.style.width = progressValue + "%";
        progress.textContent = progressValue + "%";

        const markButton = document.createElement("button");
        markButton.type = "button";
        markButton.textContent = "Отметить";
        markButton.classList.add("mark-button");

        card.setAttribute("data-habit", title);

        progressBar.appendChild(progress);
        card.appendChild(heading);
        card.appendChild(progressBar);
        card.appendChild(markButton);

        // Увеличение прогресса по кнопке
        markButton.addEventListener("click", function () {
            let currentProgress = parseInt(progress.style.width);

            if (currentProgress < 100) {
                currentProgress += 10;

                if (currentProgress > 100) {
                    currentProgress = 100;
                }

                progress.style.width = currentProgress + "%";
                progress.textContent = currentProgress + "%";

                saveHabits();
            }
        });

        return card;
    }

    function addHabit() {
        const title = prompt("Введите название новой экопривычки:");

        if (title === null || title.trim() === "") {
            alert("Название привычки не введено.");
            return;
        }

        const newCard = createHabitCard(title.trim(), 0);

        habitsContainer.appendChild(newCard);
        saveHabits();

        console.log("Добавлена новая привычка:", title);
    }

    function resetProgress() {

        // Поиск всех прогресс баров
        const progressBars = document.querySelectorAll(".progress");

        progressBars.forEach(function (progress) {
            progress.style.width = "0%";
            progress.textContent = "0%";
        });

        saveHabits();

        console.log("Прогресс всех привычек сброшен.");
    }

    function toggleHabits() {
        habitsContainer.classList.toggle("hidden");

        if (habitsContainer.classList.contains("hidden")) {
            toggleHabitsButton.textContent = "Показать привычки";
        } else {
            toggleHabitsButton.textContent = "Скрыть привычки";
        }
    }

    function loadHabits() {
        const savedHabits = localStorage.getItem("habits");

        if (savedHabits) {
            const habits = JSON.parse(savedHabits);

            // Удаление исходных карточек
            habitsContainer.innerHTML = "";

            // Создание карточек из сохранённых данных
            habits.forEach(function (habit) {
                const card = createHabitCard(
                    habit.title,
                    habit.progress
                );

                habitsContainer.appendChild(card);
            });
        }
    }

    // Обработчики событий

    if (addHabitButton) {
        addHabitButton.addEventListener("click", addHabit);
    }

    if (resetButton) {
        resetButton.addEventListener("click", resetProgress);
    }

    if (toggleHabitsButton) {
        toggleHabitsButton.addEventListener("click", toggleHabits);
    }

    if (themeButton) {
        themeButton.addEventListener("click", toggleTheme);
    }

    // Восстановление состояния страницы
    loadTheme();
    loadHabits();
});
