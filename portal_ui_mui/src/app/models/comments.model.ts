import { IUser } from "./user.model";

export interface Comments {
    commentId: string,
    commentMessage: string,
    postId: string,
    userId: string,
    user: IUser,
    createdAt?: Date,
    updatedAt?: Date
}