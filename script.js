// Випадаючий список для "Розхід"
const rozxidOptions = [
    "Розхід ЗКР",
    "Розхід НБЖ",
    "Набій 20х110 мм (АЗГ М-75, M55) БЗТ",
    "Снаряд 57х348 мм (АЗГ С-60)",
    "Набій 23х152 мм (ЗУ-23-2) ОФЗ",
    "Набій 23х152 мм (ЗУ-23-2) БЗТ",
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

document.getElementById('add-rozxid').addEventListener('click', () => {
    const container = document.getElementById('rozxid-container');
    const newRow = document.createElement('div');
    newRow.classList.add('rozxid-row');

    // Створення HTML для нового рядка
    const selectHTML = rozxidOptions.map(option => `<option>${option}</option>`).join("");
    newRow.innerHTML = `
        <label>Розхід:</label>
        <select>${selectHTML}</select>
        <input type="number" placeholder="Кількість">
        <button type="button" class="delete-btn">Видалити</button>
    `;

    container.appendChild(newRow);
});

document.getElementById('rozxid-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const form = document.getElementById('form');
    let data = '';

    // Проходимо по всім елементам форми
    form.querySelectorAll('.row').forEach(row => {
        const label = row.querySelector('label')?.innerText || '';
        const input = row.querySelector('input, select')?.value || '';
        if (input) {
            data += `${label} ${input}\n`;
        }
    });

    // Обробляємо всі рядки "Розхід"
    document.querySelectorAll('.rozxid-row').forEach(row => {
        const select = row.querySelector('select')?.value || '';
        const number = row.querySelector('input[type="number"]')?.value || '';
        if (select && number) {
            data += `${select} - ${number}\n`;
        }
    });

    // Копіюємо дані у буфер
    navigator.clipboard.writeText(data.trim()).then(() => {
        alert('Дані скопійовано!');
    });
});

// Збереження даних у Local Storage
function saveFormData() {
    const formData = {};
    document.querySelectorAll("#main-form input, #main-form select").forEach((field) => {
        formData[field.name] = field.value;
    });
    localStorage.setItem("formData", JSON.stringify(formData));
}

// Відновлення даних із Local Storage
function loadFormData() {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.querySelectorAll("#main-form input, #main-form select").forEach((field) => {
            if (formData[field.name] !== undefined) {
                field.value = formData[field.name];
            }
        });
    }
}

// Додаємо обробник подій для збереження даних при зміні полів
document.querySelectorAll("#main-form input, #main-form select").forEach((field) => {
    field.addEventListener("input", saveFormData);
});

// Завантаження даних при завантаженні сторінки
window.addEventListener("load", loadFormData);
