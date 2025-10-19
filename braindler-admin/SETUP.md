# Braindler Admin - Инструкция по установке и запуску

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
cd braindler-admin
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
VITE_API_URL=http://localhost:3000
```

### 3. Запуск Backend API

Сначала запустите Braindler Assistant Backend:

```bash
cd ../braindler-assistant-backend
npm install
npm run dev
```

Backend API будет доступен на `http://localhost:3000`

### 4. Запуск Админки

В другом терминале запустите админку:

```bash
cd ../braindler-admin
npm run dev
```

Админка будет доступна на `http://localhost:8080`

## 📦 Сборка для production

```bash
npm run build
npm run preview
```

## 🏗️ Структура проекта

```
braindler-admin/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout компоненты
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/              # shadcn/ui компоненты
│   ├── pages/               # Страницы приложения
│   │   ├── Index.tsx        # Главный Dashboard
│   │   ├── ScriptsPage.tsx  # AICS Scripts
│   │   ├── DialogsPage.tsx  # История диалогов
│   │   ├── DocumentsPage.tsx # Документы
│   │   └── MonitoringPage.tsx # Мониторинг
│   ├── services/
│   │   └── apiService.ts    # API клиент
│   ├── hooks/
│   │   └── use-toast.ts     # Toast hook
│   ├── lib/
│   │   └── utils.ts         # Утилиты
│   ├── App.tsx              # Главный компонент
│   ├── main.tsx             # Входная точка
│   └── index.css            # Глобальные стили
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Особенности

### Технологии

- ⚡ **Vite** - Быстрая сборка
- ⚛️ **React 18** - UI библиотека
- 🎨 **Tailwind CSS** - Стилизация
- 🧩 **shadcn/ui** - Компоненты
- 🔄 **React Query** - Управление состоянием API
- 🛣️ **React Router** - Роутинг

### Основные функции

1. **AICS Scripts Management**
   - Создание, редактирование, удаление скриптов
   - JSON редактор для данных скриптов
   - Просмотр истории изменений

2. **Dialog History**
   - Просмотр всех диалогов
   - Анализ разговоров
   - Фильтрация и поиск

3. **Document Management**
   - Управление базой знаний
   - Загрузка документов
   - Поиск по документам

4. **Monitoring & Analytics**
   - Метрики в реальном времени
   - Графики и статистика
   - Отслеживание ошибок

## 🔧 Настройка

### API Endpoints

Админка подключается к следующим API endpoints:

- `GET /scripts` - Получить все скрипты
- `GET /scripts/:id` - Получить скрипт по ID
- `POST /scripts` - Создать скрипт
- `PUT /scripts/:id` - Обновить скрипт
- `DELETE /scripts/:id` - Удалить скрипт

### Переменные окружения

- `VITE_API_URL` - URL backend API (по умолчанию: http://localhost:3000)

## 🎯 Следующие шаги

1. **Расширение API**
   - Добавить endpoints для диалогов
   - Добавить endpoints для документов
   - Добавить endpoints для мониторинга

2. **Улучшение UI**
   - Добавить визуальный редактор AICS
   - Добавить графики аналитики
   - Добавить экспорт данных

3. **Безопасность**
   - Добавить аутентификацию
   - Добавить авторизацию
   - Добавить валидацию данных

## 📝 Примечания

- Проект создан на основе структуры holy-admin
- Использует современный React stack
- Готов к расширению и добавлению новых функций
- Полностью типизирован с TypeScript

## 🐛 Решение проблем

### Порт уже занят

Если порт 8080 занят, измените его в `vite.config.ts`:

```typescript
server: {
  host: "::",
  port: 3001, // Измените порт
}
```

### Backend API недоступен

Убедитесь что backend запущен:

```bash
cd braindler-assistant-backend
npm run dev
```

### Ошибки сборки

Очистите кэш и переустановите зависимости:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 Лицензия

MIT


