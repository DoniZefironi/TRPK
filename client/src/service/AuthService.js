import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEndpoints";

export default class AuthService {
    static async login(email, password) {
        try {
            const response = await $api.post(API_ENDPOINTS.USER.LOGIN, { email, password });
            console.log('Login response:', response.data);
            const authResponse = {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                user: {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    firstname: response.data.user.firstname,
                    lastname: response.data.user.lastname,
                    delivery_address: response.data.user.delivery_address,
                    phone_number: response.data.user.phone_number,
                    role: response.data.user.role 
                },
            };
            return authResponse;
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
                throw new Error(error.response.data.message || "Неизвестная ошибка при авторизации");
            } else if (error.request) {
                console.error("Request Error:", error.request);
                throw new Error("Не удалось установить соединение с сервером");
            } else {
                console.error("Error:", error.message);
                throw new Error("Ошибка при настройке запроса");
            }
        }
    }

    static async registration(email, password, firstname, lastname, delivery_address, phone_number) {
        try {
            const response = await $api.post(API_ENDPOINTS.USER.REGISTRATION, { email, password, firstname, lastname, delivery_address, phone_number });

            const authResponse = {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                user: {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    firstname: response.data.user.firstname,
                    lastname: response.data.user.lastname,
                    delivery_address: response.data.user.delivery_address,
                    phone_number: response.data.user.phone_number,
                    role: response.data.user.role 
                },
            };
            return authResponse;
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
                throw new Error(error.response.data.message || "Неизвестная ошибка при регистрации");
            } else if (error.request) {
                console.error("Request Error:", error.request);
                throw new Error("Не удалось установить соединение с сервером");
            } else {
                console.error("Error:", error.message);
                throw new Error("Ошибка при настройке запроса");
            }
        }
    }

    static async logout() {
        try {
            const response = await $api.post(API_ENDPOINTS.USER.LOGOUT);
            return response.data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }
}