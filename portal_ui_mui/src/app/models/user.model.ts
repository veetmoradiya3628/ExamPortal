import { Organization } from "./organization.model";

export interface IUser {
    position: number,
    selected: false,
    userId?: string,
    username?: string,
    password?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    enabled?: boolean,
    profileImage?: string,
    createdAt?: Date,
    updatedAt?: Date,
    organization?: Organization 
    roleName?: string
}