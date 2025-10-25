# Настройка Firebase для приложения

## 🔧 Необходимые настройки в Firebase Console

### 1. Включить Google Authentication

1. Откройте [Firebase Console](https://console.firebase.google.com/)
2. Выберите ваш проект `archipelago-475215`
3. Перейдите в **Authentication** → **Sign-in method**
4. Включите **Google** провайдер
5. Добавьте ваш домен в **Authorized domains**:
   - `localhost` (для разработки)
   - Ваш продакшн домен

### 2. Настроить Firestore Database

1. Перейдите в **Firestore Database**
2. Создайте базу данных в **production mode** (временно)
3. Перейдите в **Rules** и замените правила на:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow users to read/write their own characters
    match /users/{userId}/characters/{characterId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Настроить CORS (для разработки)

Если у вас проблемы с CORS, добавьте в `vite.config.ts`:

```typescript
export default defineConfig({
  // ... existing config
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  }
})
```

## 🚀 Проверка работы

После настройки:
1. Перезапустите dev сервер: `npm run dev`
2. Откройте приложение в браузере
3. Нажмите "Войти через Google"
4. Авторизуйтесь через Google
5. Проверьте, что пользователь залогинен

## 🔍 Отладка

Если проблемы остаются:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что домен добавлен в Authorized domains
3. Проверьте правила Firestore
4. Убедитесь, что Google Auth включен в Firebase Console
