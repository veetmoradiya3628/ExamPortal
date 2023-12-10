import {Option} from "./options.model";

export interface Question {
  id?: string,
  questionId?: string,
  questionText: string,
  questionType: string,
  score: number,
  quizId?: string,
  options: Array<Option>,
  createdAt?: string,
  updatedAt?: string
}
