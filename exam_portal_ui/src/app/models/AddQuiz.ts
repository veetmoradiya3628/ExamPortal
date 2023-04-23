export default interface AddQuiz {
    title: string,
    description: string,
    maxMarks: string,
    numberOfQuestions: string,
    active: boolean,
    category: {
        cid: number
    }
}