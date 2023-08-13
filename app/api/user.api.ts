import { Constants } from "@/config/constants";
import { Auth } from "./interfaces/auth.interface";

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
}