export interface Posts {
    postId?: string,
    postContent: string,
    classroomId: string,
    commentAllowed: boolean,
    commentCount: number,
    postCreatorName?: string,
    userId: string,
    createdAt?: Date,
    updatedAt?: Date
}