import { Comment } from "./comment.interface";
import { User } from "./user.interface";

export interface Cat {
    url: string;
    user: User;
    title: string;
    description: string;
    id: number;
    likeList: User[];
    comments: Comment[];
}
