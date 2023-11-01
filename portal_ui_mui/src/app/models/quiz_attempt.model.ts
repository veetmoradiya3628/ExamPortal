export interface QuizAttempt {
    id?: string,
    quizAttemptId?: string,
    quizId: string,
    userId: string,
    score: number,
    correctQuestionsId: Array<string>,
    wrongQuestionsId: Array<string>,
    notAttemptedQuestionId: Array<string>,
    isAttemptCompleted: boolean,
    reportUrl: string,
    quizStatus: QuizStatus,
    attemptStartedAt?: Date,
    attemptEndedAt?: Date
}

enum QuizStatus {
    ON_GOING,
    ENDED
}
