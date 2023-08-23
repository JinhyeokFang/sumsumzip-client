import { User } from "./user.interface";

export interface Comment {
    content: string;
    user: User;
    id: number;
}
