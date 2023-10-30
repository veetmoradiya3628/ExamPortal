import { QuizAttempt } from "./quiz_attempt.model";

export interface QuizAttemptDto {
    quizAttempt: QuizAttempt,
    attemptedStudent: string
}