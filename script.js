// Вибір кнопки і полів форми
const copyButton = document.getElementById('copyButton');
const inputs = document.querySelectorAll('input');

// Мапа відповідностей ключів до скорочень
const fieldMap = {
    "Підрозділ": "П",
    "Позивний": "П",
    "Населений пункт": "НП",
    "Дата": "Д",
    "Час": "Ч",
    "Зброя": "Зброя",
    "Номер цілі": "НЦ",
    "Висота": "Висота",
    "Опис": "Опис"
};

// Функція для форматування даних
function formatData() {
    const formattedData = Array.from(inputs).map(input => {
        const label = input.previousElementSibling.textContent.trim().replace(':', ''); // Отримуємо текст мітки без знака ':'
        const key = fieldMap[label] || label; // Знаходимо скорочення або залишаємо оригінал
        return `${key}: ${input.value}`; // Форматування рядка
    }).join('\n'); // Об'єднуємо всі рядки з переносом
    return formattedData;
}

// Функція для копіювання у буфер обміну
function copyToClipboard() {
    const data = formatData();
    navigator.clipboard.writeText(data)
        .then(() => alert('Дані скопійовані до буфера обміну!'))
        .catch(err => alert('Помилка копіювання: ' + err));
}

// Додавання обробника кліку до кнопки
copyButton.addEventListener('click', copyToClipboard);
