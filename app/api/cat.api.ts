import { Constants } from "@/config/constants";
import { Cat } from "@/interfaces/cat.interface";

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

    static async loadCatsByUserId(userId: number, pageNumber: number = 0): Promise<Cat[]> {
        try {
            const res = await fetch(`${Constants.serverAddress}/cat/user/${userId}?pageNumber=${pageNumber}`, {
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

    static async loadCatById(catId: number): Promise<Cat> {
        try {
            const res = await fetch(`${Constants.serverAddress}/cat/${catId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache'
            });
            const body = await res.json();
            return body;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async loadCatsByFollowingList(token: string, pageNumber: number = 0): Promise<Cat[]> {
        try {
            const res = await fetch(`${Constants.serverAddress}/cat/follows?pageNumber=${pageNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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


    static async loadCatsByLikeList(token: string): Promise<Cat[]> {
        try {
            const res = await fetch(`${Constants.serverAddress}/cat/likes`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

    static async uploadCat(token: string, title: string, description: string, image: File): Promise<void> {
        const formData = new FormData();
		formData.append('image', image);
		formData.append('title', title);
		formData.append('description', description);

        try {
            const res = await fetch(`${Constants.serverAddress}/cat/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const body = await res.json();
            return body;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async like(token: string, catId: number): Promise<void> {
        try {
            await fetch(`${Constants.serverAddress}/cat/like`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: new URLSearchParams({
                    catId: `${catId}`,
                })
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async dislike(token: string, catId: number): Promise<void> {
        try {
            await fetch(`${Constants.serverAddress}/cat/dislike`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: new URLSearchParams({
                    catId: `${catId}`,
                })
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addComment(token: string, catId: number, content: string): Promise<void> {
        try {
            await fetch(`${Constants.serverAddress}/cat/comment`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: new URLSearchParams({
                    catId: `${catId}`,
                    content,
                })
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}