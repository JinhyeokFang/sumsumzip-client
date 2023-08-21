export interface User {
    email: string;
    name: string;
    picture: string;
    id: number;
    followers: User[];
    following: User[];
}
