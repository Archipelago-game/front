// Новый API с использованием fetch вместо Backendless SDK
import type { Character } from "./character-types";
import type { FormType } from "../modules/game-form/types/form/form.type";
import type { BackendlessUser, AuthResponse } from "./backendless-types";

// Конфигурация API
const APP_ID = "921EA541-5840-4551-9113-0FD60D6B3802";
const API_KEY = "E21FF1D5-DAE8-4ACE-B1DB-E86A67A23FDC";
const BASE_URL = `https://api.backendless.com/${APP_ID}/${API_KEY}`;

/**
 * Базовый класс для работы с API через fetch
 */
class FetchApi {
  private baseUrl: string;
  private appId: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = BASE_URL;
    this.appId = APP_ID;
    this.apiKey = API_KEY;
  }

  /**
   * Базовый метод для выполнения HTTP запросов
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
      "application-id": this.appId,
      "secret-key": this.apiKey,
      "user-token": "",
    };

    // Добавляем токен пользователя если он есть
    const token = this.getUserToken();
    if (token) {
      defaultHeaders["user-token"] = token;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      // Проверяем, есть ли контент для парсинга
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        // Возвращаем текст для OAuth URL и подобных случаев
        return (await response.text()) as T;
      }
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * GET запрос
   */
  private async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  /**
   * POST запрос
   */
  private async post<T>(endpoint: string, data?: object): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT запрос
   */
  private async put<T>(endpoint: string, data?: object): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Получить токен пользователя из localStorage
   */
  private getUserToken(): string | null {
    return localStorage.getItem("backendless_user_token");
  }

  // === Методы для работы с персонажами ===

  /**
   * Создать нового персонажа
   */
  async createCharacter(
    characterData: FormType,
    name: string,
  ): Promise<Character> {
    const character = {
      name,
      characterData,
      lastModified: new Date().toISOString(),
      version: 1,
      isDeleted: false,
      gameSystem: "ARCHIPELAGO",
      characterStatus: "active",
    };

    return this.post<Character>(`/data/Character`, character);
  }

  /**
   * Получить всех персонажей пользователя
   */
  async getUserCharacters(): Promise<Character[]> {
    const query = {
      where: "isDeleted = false",
      sortBy: ["lastModified DESC"],
    };

    const response = await this.get<{ data: Character[] }>(
      `/data/Character?where=${encodeURIComponent(query.where)}&sortBy=${query.sortBy.join(",")}`,
    );
    return response.data;
  }

  /**
   * Получить персонажа по ID
   */
  async getCharacterById(characterId: string): Promise<Character> {
    return this.get<Character>(`/data/Character/${characterId}`);
  }

  /**
   * Обновить персонажа
   */
  async updateCharacter(
    characterId: string,
    characterData: FormType,
    version: number,
  ): Promise<Character> {
    // Сначала получаем существующего персонажа для проверки версии
    const existingCharacter = await this.getCharacterById(characterId);

    // Проверяем версию для предотвращения конфликтов
    if (existingCharacter.version !== version) {
      throw new Error(
        "Конфликт версий. Персонаж был изменен другим устройством",
      );
    }

    const updateData = {
      characterData,
      lastModified: new Date().toISOString(),
      version: version + 1,
    };

    return this.put<Character>(`/data/Character/${characterId}`, updateData);
  }

  /**
   * Удалить персонажа (мягкое удаление)
   */
  async deleteCharacter(characterId: string): Promise<void> {
    const updateData = {
      isDeleted: true,
      characterStatus: "deleted",
      lastModified: new Date().toISOString(),
    };

    await this.put(`/data/Character/${characterId}`, updateData);
  }

  /**
   * Архивировать персонажа
   */
  async archiveCharacter(characterId: string): Promise<void> {
    const updateData = {
      characterStatus: "archived",
      lastModified: new Date().toISOString(),
    };

    await this.put(`/data/Character/${characterId}`, updateData);
  }

  /**
   * Восстановить персонажа из архива
   */
  async restoreCharacter(characterId: string): Promise<void> {
    const updateData = {
      characterStatus: "active",
      lastModified: new Date().toISOString(),
    };

    await this.put(`/data/Character/${characterId}`, updateData);
  }

  // === Методы для работы с пользователями ===

  /**
   * Получить текущего пользователя
   */
  async getCurrentUser(): Promise<BackendlessUser | null> {
    try {
      return await this.get<BackendlessUser>("/users/me");
    } catch (error) {
      console.warn("Не удалось получить текущего пользователя:", error);
      return null;
    }
  }

  /**
   * Проверить валидность токена
   */
  async isValidLogin(): Promise<boolean> {
    try {
      await this.get("/users/isvalidusertoken");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Установить токен пользователя
   */
  setUserToken(token: string): void {
    localStorage.setItem("backendless_user_token", token);
  }

  /**
   * Удалить токен пользователя
   */
  removeUserToken(): void {
    localStorage.removeItem("backendless_user_token");
  }

  // === OAuth методы ===

  /**
   * Получить OAuth URL для Google аутентификации
   */
  async getGoogleOAuthUrl(redirectAfterLoginUrl: string): Promise<string> {
    const response = await this.post<string>(
      "/users/oauth/googleplus/request_url",
      {
        redirectAfterLoginUrl,
        scopes: ["email", "https://www.googleapis.com/auth/userinfo.profile"],
      },
    );

    if (!response || !response.startsWith("http")) {
      throw new Error("Invalid OAuth URL received");
    }

    return response;
  }

  /**
   * Обработать OAuth callback
   */
  async handleOAuthCallback(
    oauthCode: string,
    redirectUrl: string,
  ): Promise<AuthResponse> {
    return this.post<AuthResponse>("/users/oauth/googleplus/access_token", {
      code: oauthCode,
      redirectUrl,
    });
  }
}

// Экспортируем экземпляр API
export const fetchApi = new FetchApi();
