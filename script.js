const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");
const eventDate = document.getElementById("eventDate");

eventDate.max = new Date().toISOString().split("T")[0];

let events = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const type = document.getElementById("eventType").value;
    const date = eventDate.value;
    const severity = document.getElementById("severity").value;
    const status = document.getElementById("status").value;
    const description = document.getElementById("description").value.trim();

    if (!type || !date || !severity || !status || !description) {
        alert("Заповніть усі обов'язкові поля!");
        return;
    }

    if (new Date(date) > new Date(new Date().toDateString())) {
        alert("Дата події не може бути в майбутньому!");
        return;
    }

    if (description.length < 10 || description.length > 500) {
        alert("Опис повинен містити від 10 до 500 символів.");
        return;
    }

    const newEvent = {
        id: Date.now(),
        type,
        date,
        severity,
        status,
        description
    };

    events.push(newEvent);
    renderEvents();
    form.reset();

    alert("Подію успішно додано до журналу!");
});

function renderEvents() {
    eventList.innerHTML = "";

    if (events.length === 0) {
        eventList.innerHTML =
            '<p class="empty">Поки що подій не зареєстровано.</p>';
        return;
    }

    events.forEach(function (event) {
        const card = document.createElement("div");
        card.className = "event-card";

        const title = document.createElement("h3");
        title.textContent = event.type;

        const details = [
            "Дата: " + event.date,
            "Критичність: " + event.severity,
            "Статус: " + event.status,
            "Опис: " + event.description
        ];

        card.appendChild(title);

        details.forEach(function (detail) {
            const paragraph = document.createElement("p");
            paragraph.textContent = detail;
            card.appendChild(paragraph);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Видалити";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            events = events.filter(function (item) {
                return item.id !== event.id;
            });
            renderEvents();
        });

        card.appendChild(deleteButton);
        eventList.appendChild(card);
    });
}
