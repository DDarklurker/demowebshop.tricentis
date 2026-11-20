# Практика автоматизації

Pet-проєкт для практики автоматизації тестування.
Інтернет-магазин із покриттям основних тестів автоматизацією.

Сайт: <https://demowebshop.tricentis.com>, стек: Playwright + TypeScript.

Покрито: реєстрацію (happy path та corner cases), відновлення пароля, продукти та кошик.

## Підходи

- Page Object
- фікстури
- setup
- teardown

## Секрети для CI

- `LOGIN`
- `PASSWORD`
- `USERS_JSON`

## Встановлення

Спочатку потрібно встановити необхідні компоненти та браузери:

```bash
npm install
npx playwright install chromium
```

## Налаштування

Створити `.env` файл для локального запуску:

```env
LOGIN=example@mail.com
PASSWORD=trustpassword
```

Створити `tests/data/users.json` з інформацією про юзерів. Необхідно мінімум 3 юзери для тестів:

```json
[
  {
    "id": 1,
    "gender": "Male",
    "firstname": "test",
    "lastname": "test",
    "email": "test1@mail.com",
    "password": "test",
    "confirmpassword": "test"
  },
  {
    "id": 2,
    "gender": "Female",
    "firstname": "test",
    "lastname": "test",
    "email": "test2@mail.com",
    "password": "test",
    "confirmpassword": "test"
  },
  {
    "id": 3,
    "gender": "Male",
    "firstname": "test",
    "lastname": "test",
    "email": "test3@mail.com",
    "password": "test",
    "confirmpassword": "test"
  }
]
```

## Запуск

Запустити всі тести локально:

```bash
npx playwright test
```
