// src/types/user.ts

export interface IUserProfile {
    username: string;
    first_name?: string | null;
    last_name?: string | null;
    avatar?: string | null;
    phone_number?: string | null;
}
