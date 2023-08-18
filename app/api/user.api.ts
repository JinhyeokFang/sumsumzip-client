import { Constants } from "@/config/constants";
import { Auth } from "@/interfaces/auth.interface";

export class UserApi {
    static async getAuth(): Promise<Auth> {
        try {
            const res = await fetch(`${Constants.serverAddress}/token`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                cache: 'no-cache',
            });
            const body = await res.json();
            return body;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getUserDataByToken(token: string): Promise<Record<string, string>> {
        try {
            const res = await fetch(`${Constants.serverAddress}/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                cache: 'no-cache',
            });
            const body = await res.json();
            return body;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getUserDataByUserId(userId: number): Promise<Record<string, string>> {
        try {
            const res = await fetch(`${Constants.serverAddress}/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache',
            });
            const body = await res.json();
            return body;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async follow(token: string, followingId: number): Promise<void> {
        try {
            await fetch(`${Constants.serverAddress}/user/follow`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: new URLSearchParams({
                    followingId: `${followingId}`,
                })
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async unfollow(token: string, followingId: number): Promise<void> {
        try {
            await fetch(`${Constants.serverAddress}/user/unfollow`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: new URLSearchParams({
                    followingId: `${followingId}`,
                })
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}