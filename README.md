# Фильмопоиск

Запуск
```
npm i
npm run dev
```

для связи:   
<a href="https://t.me/Koteikanata">
  <img src="https://cdn.icon-icons.com/icons2/2807/PNG/512/telegram_icon_178920.png" alt="tg" width="48" />
</a>


## Критерии оценки

### Базовые требования:

#### Создан github-репозиторий, в нём есть README, gitignore, установлены все необходимые зависимости — 5 баллов.
✅ Проект запускается — 5 баллов.   
✅ Вёрстка соответствует дизайн-макетам (допускаются минимальные отхождения, адаптив не требуется) — 5 баллов.   

### Функциональные требования:

#### Шапка (max 2 балла)
✅ Позиционируется липко (стики) — 2 балла.

#### Авторизация (max 16 баллов)
✅ Для реализации модального окна используется портал — 3 балла.   
✅ После успешной авторизации кнопка «Войти» меняется на заглушку иконки пользователя и кнопку «Выйти» — 2 балла.   
✅ Сохраняем авторизационный токен из ответа ручки бэка (например, в localStorage) — 4 балла.   
✅ В идеале, работать с токеном через thunk (где-то в мидлваре) — 3 балла.   
✅ По клику на кнопку «Выйти» удаляем токен и снимает авторизацию — 2 балла.   
✅ При инициализации приложения проверяем авторизационный токен — 2 балла.   

#### Реализована страница списка фильмов (max 14 баллов)
##### Поиск:
✅ Поиск происходит во время ввода пользователем символов. Дёргаем ручку /search — 4 балла.   
##### Фильтры:
✅ Реализованы фильтры с dropdown — 4 балла.   
✅ Сохранять фильтры в query-params — 3 балла.   
✅ Реализован список фильмов с пагинацией — 3 балла.   

#### Страница фильма (max 17 баллов)
##### Реализована работа с получением данных:
✅ Дёргаем ручку /movie — 4 балла.   
✅ Соответствующие данные отрисованы — 3 балла.   
##### Возможность поставить оценку:
✅ Есть запрос за получением оценки для фильма — 3 балла.   
✅ Если пользователь авторизован, даём возможность поставить оценку — запрос мутации — 3 балла.   
✅ После выставления оценки обновляем кеш запроса /movie — 4 балла.   

#### Общий функционал (max 8 баллов)
✅ Реализовать единообразную обработку ошибок для запросов — 2 балла.   
✅ Реализован лоадер — 2 балла.   
✅ Используем debounce для поиска фильма и выставления оценки — 4 балла.   

#### Стор (max 8 баллов)
✅ Используется rtk и rtk-query — 4 балла.   
✅ Данные корректно разбиты на модули (пример — авторизация, searchParams из фильтров) — 2 балла.   
✅ Селекторы написаны оптимально (нет кучи дублирования) — 2 балла.   

#### Миграция на Next (max 20 баллов)
❌ Реализована миграция с использованием SSR — 14 баллов.   
❌ Для картинок используется Image некста. Скрины фильма, которые вне вьюпорта грузятся лениво — 2 балла.   
❌ Страница фильма реализована с помощью Dynamic Routes — 4 балла.   

<b>Итого: 80/100 баллов</b>
