document.addEventListener('DOMContentLoaded', function() {
    const addressInput = document.querySelector('input[name="address"]'); // Изменяем селектор на поиск по имени
    DADATA_TOKEN = "4d3d6512dc4ae01def51b94edace43ab67536f41";
    console.log("DADATA_TOKEN from dadata.js:", DADATA_TOKEN);

    if (addressInput) {
        console.log("Элемент найден:", addressInput); // Проверяем наличие элемента

        // Создаем стиль для контейнера подсказок
        const style = document.createElement('style');
        style.innerHTML = `
            .suggestions-container {
                border: 1px solid #ccc;
                max-height: 150px; /* Ограничиваем высоту */
                overflow-y: auto; /* Добавляем прокрутку */
                position: absolute; /* Позволяем расположить список под input */
                background-color: black; /* Белый фон */
                width: calc(100% - 2px); /* Ширина равная ширине input минус границы */
                z-index: 1000; /* Заставляем быть выше других элементов */
                margin-top: 40px; /* Отступ сверху для расположения под input */
            }
            .suggestion-item {
                padding: 10px;
                cursor: pointer;
            }
            .suggestion-item:hover {
                background-color: grey; /* Цвет при наведении */
            }
        `;
        document.head.appendChild(style); // Добавляем стили в head

        addressInput.addEventListener('input', function() {
            const query = this.value.trim(); // Убираем лишние пробелы

            console.log('Запрос к DaData с параметром:', query); // Лог запроса

            // Проверяем длину запроса
            if (query.length >= 3) { // Запрос только при вводе 3 или более символов
                fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address?query=${encodeURIComponent(query)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${DADATA_TOKEN}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Ответ от DaData:', data); // Лог ответа от API
                    const suggestions = data.suggestions;

                    console.log('Подсказки:', suggestions); // Лог подсказок

                    // Очищаем предыдущий контейнер для подсказок, если он существует
                    const suggestionsContainer = document.getElementById('address-suggestions-container');
                    if (suggestionsContainer) {
                        suggestionsContainer.remove(); // Удаляем старый контейнер
                    }

                    // Создаем новый контейнер для подсказок
                    const container = document.createElement('div');
                    container.id = 'address-suggestions-container';
                    container.className = 'suggestions-container'; // Добавьте свои стили для контейнера

                    // Создаем новые элементы с подсказками
                    suggestions.forEach(suggestion => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.className = 'suggestion-item'; // Добавьте классы для стилизации
                        suggestionItem.textContent = suggestion.value; // Текст подсказки

                        // Добавляем обработчик клика для выбора подсказки
                        suggestionItem.addEventListener('click', () => {
                            addressInput.value = suggestion.value; // Устанавливаем значение в input
                            container.innerHTML = ''; // Очищаем контейнер
                        });

                        container.appendChild(suggestionItem);
                    });

                    // Добавляем контейнер с подсказками в родительский элемент
                    const parent = addressInput.parentNode;
                    parent.appendChild(container);
                })
                .catch(error => {
                    console.error('Ошибка получения данных:', error);
                });
            } else if (query.length === 0) {
                // Сбрасываем контейнер с подсказками, если строка пустая
                const suggestionsContainer = document.getElementById('address-suggestions-container');
                if (suggestionsContainer) {
                    suggestionsContainer.remove(); // Удаляем контейнер, когда поле ввода пустое
                }
            } else {
                console.log('Запрос слишком короткий, необходимо 3 или более символов.'); // Лог для короткого запроса
            }
        });
    } else {
        console.log("Элемент с именем 'address' не найден."); // Лог, если элемент не найден
    }
});