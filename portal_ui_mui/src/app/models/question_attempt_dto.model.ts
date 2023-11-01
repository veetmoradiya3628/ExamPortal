import { Option } from "./options.model";
import { Question } from "./question.model";

export interface QuestionAttemptDto {
    question: Question;
    userId: string,
    quizAttemptId: string,
    selectedOptions: Array<Option>
}