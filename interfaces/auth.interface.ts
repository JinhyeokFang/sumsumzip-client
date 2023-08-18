export interface Auth {
    logined: boolean;
    token: string | null;
    email: string | null;
}