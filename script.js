const rozxidOptions = [
    "Набій 20х110 мм (АЗГ М-75, M55) БЗТ",
    "Снаряд 57х348 мм (АЗГ С-60)",
    "Набій 23х152 мм (ЗУ-32-2) ОФЗ",
    "Набій 23х152 мм (ЗУ-32-2) БЗТ",
    "Набій 14,5х114 мм (ЗПУ, КПВТ) Б-32 гл",
    "Набій 14,5х114 мм (ЗПУ, КПВТ) БЗТ гл",
    "Набій 12,7х108 мм (ДШК, НСВ, Корд, W85) МДЗ",
    "Набій 12,7х108 мм (ДШК, НСВ, Корд, W85) БЗТ",
    "Набій 12,7х108 мм (ДШК, НСВ, Корд, W85) Б-32",
    "Набій 12,7х99 мм (Canik, Browning) (4-M33, 1-M17)",
    "Набій 7,62х54 мм (ПКМ, КМ-7,62, СВД) ЛПС",
    "Набій 7,62х54 мм (ПКМ, КМ-7,62, СВД) Т-46",
    "Набій 7,62х54 мм (ПКМ, КМ-7,62, СВД) Б-32",
    "Набій 7,62х51 мм (CZ TSR, MG3, MG42, FN MAG)",
    "Набій 7,62х39 мм (РКК, РКД, АКМ) ПС",
    "Набій 7,62х39 мм (РКК, РКД, АКМ) Т-45",
    "Набій 5,56х45 мм (FNC) SS109",
    "Набій 5,45х39 мм ПС",
    "Набій 5,45х39 мм Т"
];

// Додаємо новий рядок "Розхід"
document.getElementById('add-rozxid').addEventListener('click', () => {
    const container = document.getElementById('rozxid-container');
    const newRow = document.createElement('div');
    newRow.classList.add('rozxid-row');

    const selectHTML = rozxidOptions.map(option => `<option>${option}</option>`).join("");
    newRow.innerHTML = `
        <label>Розхід:</label>
        <select>${selectHTML}</select>
        <input type="number" placeholder="Кількість">
        <button type="button" class="delete-btn">Видалити</button>
    `;
    container.appendChild(newRow);
});

// Видалення рядка "Розхід"
document.getElementById('rozxid-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
});

// Відправлення даних у Google Таблицю
document.getElementById('copy-btn').addEventListener('click', async () => {
    const form = document.getElementById('form');
    const tableData = [];

    // Збираємо дані з текстових і числових полів (окрім "Опис")
    form.querySelectorAll('.row').forEach(row => {
        const label = row.querySelector('label')?.innerText || '';
        const input = row.querySelector('input, select')?.value || '';
        if (input && label !== "Опис:") {
            tableData.push(input);
        }
    });

    // Збираємо дані з рядків "Розхід"
    document.querySelectorAll('.rozxid-row').forEach(row => {
        const select = row.querySelector('select')?.value || '';
        const number = row.querySelector('input[type="number"]')?.value || '';
        if (select && number) {
            tableData.push(`${select} - ${number}`);
        }
    });

    // Відправлення даних через POST-запит
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzADYqffG991Le_wYce0HFzGCdB7XK5Oc0z5wpixK10BeQdutX-Nj4u2-XFeJnxltRPfw/exec", {
            method: "POST",
            body: JSON.stringify(tableData),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            alert("Дані успішно внесені в таблицю!");
        } else {
            alert("Помилка при відправці даних.");
        }
    } catch (error) {
        console.error("Помилка:", error);
        alert("Не вдалося з'єднатися з сервером.");
    }
});
