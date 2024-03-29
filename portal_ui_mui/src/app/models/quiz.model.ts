export interface Quiz {
    id?: string,
    quizId?: string,
    quizTitle: string,
    quizDescription: string,
    classroomId: string,
    classroomName: string,
    isActive: boolean,
    startTime: string,
    endTime: string,
    duration: number,
    numberOfQuestions: number,
    totalMarks: number,
    quizImage: string,
    maxAttempts: number,
    createdBy: string,
    questionIds: Array<string>,
    createdAt?: Date,
    updatedAt?: Date
  }
  