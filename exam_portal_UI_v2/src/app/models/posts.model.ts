export interface Posts {
    postId?: string,
    postContent: string,
    classroomId: string,
    commentAllowed: boolean,
    postCreatorName?: string,
    userId: string,
    createdAt?: Date,
    updatedAt?: Date
}