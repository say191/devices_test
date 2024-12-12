# Упрощенный сервис управления серверным оборудованием

## Описание проекта

Проект представляет собой упрощенную аналогию сервиса NETBOX, созданного для управления инфраструктурой и отслеживания серверного оборудования. Система разработана с использованием Django и предназначена для хранения и управления информацией о серверных устройствах. Она предоставляет пользователю интерфейс для работы с моделями данных, позволяя осуществлять операции CRUD (создание, чтение, обновление и удаление) для различных типов серверных устройств и их моделей.

### Назначение

Задача данного проекта заключается в упрощении учета серверного оборудования, его местоположения и характеристик. Сервис позволяет пользователям:
- отслеживать информацию о каждое устройство, включая его адрес, название, IP-адрес, а также комментарии;
- управлять моделями устройств, предоставляя возможность добавления и обновления информации о различных типах оборудования;
- интегрироваться с API внешнего сервиса DaData для автозаполнения адресных полей и обеспечения корректности данных;
- предоставлять REST API для взаимодействия с внешними системами, что позволяет осуществлять полный набор операций с данными через токенизированную аутентификацию.

Проект призван продемонстрировать навыки разработки с использованием Django, модели данных, администрирование через Django Admin, создание REST API и интеграцию с внешними сервисами через API.

## Установка

1. Клонируйте репозиторий
2. Создайте виртуальное окружение -  python -m venv env
3. Активируйте виртуальное окружение - source env/bin/activate
4. Установите зависимости - pip install -r requirements.txt
5. Выполните миграции базы данных -  python manage.py migrate
6. Создайте суперпользователя для тестирования сервиса - python manage.py createsuperuser
7. Добавьте файл `.env` в корневую директорию вашего проекта для хранения конфиденциальных настроек по примеру шаблона `.env.sample`
8. Запустите сервер разработки - python manage.py runserver