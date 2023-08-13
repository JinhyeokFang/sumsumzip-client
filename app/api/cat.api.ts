import { Constants } from "@/config/constants";
import { Cat } from "./interfaces/cat.interface";

export class CatApi {
    static async loadCats(pageNumber: number = 0): Promise<Cat[]> {
        try {
            const res = await fetch(`${Constants.serverAddress}/cat?pageNumber=${pageNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache'
            });
            const body = await res.json();
            return body.cats;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async loadCatsByUserId(userId: number): Promise<Cat[]> {
        try {
            const res = await fetch(`${Constants.serverAddress}/cat/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache'
            });
            const body = await res.json();
            return body.cats;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}