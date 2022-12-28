import { Role } from "./role";

export interface User {
    email: string;
    name: string;
    _id: number;
    role: Role;
}