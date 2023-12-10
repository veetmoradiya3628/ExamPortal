import { Injectable } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { UserServiceService } from "../common/service/user-service.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class QuizAttemptReportService {
    constructor(private _userService: UserServiceService) { }

    public generatePdf(data: any) {
        console.log('pdf generator called')
        let docDefinition = {
            content: [],
            styles: {},
        };
        this.addQuizHeader(docDefinition, data);
        this.addQuizAttemtMetaData(docDefinition, data);
        this.addRequiredStyles(docDefinition);
        this.addQuestionHeader(docDefinition);
        this.addQuestionTable(docDefinition, data);
        pdfMake.createPdf(docDefinition).open();
    }


    addQuizHeader(document: any, data: any) {
        // content section
        let headerContent: any = {};
        headerContent['text'] = 'Quiz Attempt Report';
        headerContent['style'] = 'header';
        headerContent['alignment'] = 'center';

        document.content.push(headerContent);
    }

    addQuizAttemtMetaData(document: any, data: any) {
        let quizMetaSection: any = {};
        let quizMetaTable: any = {};

        // content
        quizMetaSection['style'] = 'info_table'
        quizMetaSection['table'] = quizMetaTable
        quizMetaSection['layout'] = {
            defaultBorder: true,
        }

        quizMetaTable['widths'] = ['*', '*', '*', '*']
        quizMetaTable['body'] = []

        let quizTitleObj = [];
        quizTitleObj.push({
            text: 'Quiz Title',
            style: 'subheader'
        })
        quizTitleObj.push({
            colSpan: 3,
            text: data.quiz.quizTitle,
            style: 'subheader_notbold'
        })
        quizTitleObj.push({})
        quizTitleObj.push({})
        quizMetaTable['body'].push(quizTitleObj)

        let quizDescObj = [];
        quizDescObj.push({
            text: 'Quiz Description',
            style: 'subheader'
        })
        quizDescObj.push({
            colSpan: 3,
            text: data.quiz.quizDescription,
            style: 'subheader_2'
        })
        quizDescObj.push({})
        quizDescObj.push({})
        quizMetaTable['body'].push(quizDescObj)

        let quizStudentObj = [];
        quizStudentObj.push({
            text: 'Student ',
            style: 'subheader'
        })
        quizStudentObj.push({
            colSpan: 3,
            text: data.attemptedUsername,
            style: 'subheader_2'
        })
        quizStudentObj.push({})
        quizStudentObj.push({})
        quizMetaTable['body'].push(quizStudentObj)

        let quizScoreObj = [];
        quizScoreObj.push({
            text: 'Score',
            style: 'subheader'
        })
        quizScoreObj.push({
            text: data.quizAttempt.score,
            style: 'subheader_2'
        })
        quizScoreObj.push({
            text: 'Total Score ',
            style: 'subheader'
        })
        quizScoreObj.push({
            text: data.quiz.totalMarks,
            style: 'subheader_2'
        })
        quizMetaTable['body'].push(quizScoreObj)

        let quizTimerObj = [];
        quizTimerObj.push({
            text: 'Start time ',
            style: 'subheader'
        })
        quizTimerObj.push({
            text: data.quizAttempt.attemptStartedAt,
            style: 'subheader_2'
        })
        quizTimerObj.push({
            text: 'Completion time ',
            style: 'subheader'
        })
        quizTimerObj.push({
            text: data.quizAttempt.attemptEndedAt,
            style: 'subheader_2'
        })
        quizMetaTable['body'].push(quizTimerObj)

        let quizQuestionObj = [];
        quizQuestionObj.push({
            text: 'Total Questions',
            style: 'subheader'
        })
        quizQuestionObj.push({
            text: data.quiz.numberOfQuestions,
            style: 'subheader_2'
        })
        quizQuestionObj.push({
            text: 'Attempted Questions',
            style: 'subheader'
        })
        quizQuestionObj.push({
            text: data.quiz.numberOfQuestions - data.quizAttempt.notAttemptedQuestionId.length,
            style: 'subheader_2'
        })
        quizMetaTable['body'].push(quizQuestionObj)

        let quizQuestionAttemptObj = [];
        quizQuestionAttemptObj.push({
            text: 'Correct Questions',
            style: 'subheader'
        })
        quizQuestionAttemptObj.push({
            text: data.quizAttempt.correctQuestionsId.length,
            style: 'subheader_2'
        })
        quizQuestionAttemptObj.push({
            text: 'Wrong Questions',
            style: 'subheader'
        })
        quizQuestionAttemptObj.push({
            text: data.quizAttempt.wrongQuestionsId.length,
            style: 'subheader2'
        })
        quizMetaTable['body'].push(quizQuestionAttemptObj)

        document.content.push(quizMetaSection)
    }

    addQuestionHeader(document: any) {
        document.content.push({
            text: 'Questions',
            style: 'question_header'
        })
    }

    addQuestionTable(document: any, data: any) {
        let questionIndex = 1;
        // correctAttemptedQuestions
        for (let index = 0; index < data.correctAttemptedQuestions.length; index++) {
            const element = data.correctAttemptedQuestions[index];
            console.log(element)
            this.addQuestionTableContent(document, questionIndex, element.question, true, element);
            questionIndex++;
        }

        // wrongAttemptedQuestions
        for (let index = 0; index < data.wrongAttemptedQuestions.length; index++) {
            const element = data.wrongAttemptedQuestions[index];
            console.log(element)
            this.addQuestionTableContent(document, questionIndex, element.question, true, element);
            questionIndex++;  
        }

        // notAttemptedQuestions
        for (let index = 0; index < data.notAttemptedQuestions.length; index++) {
            const element = data.notAttemptedQuestions[index];
            console.log(element)
            this.addQuestionTableContent(document, questionIndex, element, false, element);
            questionIndex++;
        }
    }

    addQuestionTableContent(document: any, questionIndex : number, question_data: any, isAttempted: boolean, question_attempt_data: any) {
        let question: any = {}
        question['style'] = 'question_table'
        question['layout'] = {
            defaultBorder: false,
        }

        question['table'] = {
            'body': []
        }

        let questionTitle: any = [];
        questionTitle.push({
            colSpan: 6,
            text: questionIndex.toString() + ' ' +question_data.questionText,
            style: 'question_title'
        })
        questionTitle.push({}, {}, {}, {}, {})
        question.table.body.push(questionTitle)


        let attemptStatus = '';
        if (isAttempted) {
            if (question_attempt_data.isAttemptedCorrect) {
                attemptStatus += 'attempted correctly '
            } else {
                attemptStatus += 'attempted wrongly'
            }
        } else {
            attemptStatus += 'not attempted'
        }
        let questionMeta: any = [];
        questionMeta.push(
            {
                text: 'Score : ',
            },
            {
                text: question_data.score
            },
            {
                text: 'Attempt Status : '
            },
            {
                text: attemptStatus
            },
            {
                text: 'Question Type : '
            },
            {
                text: question_data.questionType
            }
        )
        question.table.body.push(questionMeta)

        let optionsText: any = [];
        optionsText.push(
            {
                colSpan: 6,
                text: 'Options : '
            }, {}, {}, {}, {}, {}
        )
        question.table.body.push(optionsText)

        for (let index = 0; index < question_data.options.length; index++) {
            let opt: any = question_data.options[index];
            let option: any = [];
            option.push({
                colSpan: 6,
                text: (index + 1).toString() + '. '+ opt.optionText,
                fontSize: 10,
                margin: [25, 0, 0, 0]
            },
                {}, {}, {}, {}, {})
            question.table.body.push(option)
        }

        let selectedOptionText = '';
        if (isAttempted) {
            question_attempt_data.selectedOptions.forEach((attempt_data: any) => {
                selectedOptionText += attempt_data.optionText + ', '
            });
        }

        let selectedOptionsObj: any = []
        selectedOptionsObj.push({
            colSpan: 2,
            text: 'Selected Options: '
        },
            {},
            {
                colSpan: 4,
                text: selectedOptionText,
            }, {}, {}, {})
        question.table.body.push(selectedOptionsObj)

        document.content.push(question);
    }

    addRequiredStyles(document: any) {
        // header style section
        let headerStyles: any = {}
        headerStyles['fontSize'] = 18
        headerStyles['bold'] = true

        document.styles['header'] = headerStyles

        // quizMeta table styles
        let subHeaderStyle: any = {}
        subHeaderStyle['fontSize'] = 11
        subHeaderStyle['bold'] = true

        document.styles['subheader'] = subHeaderStyle

        let subHeader2Style: any = {}
        subHeader2Style['fontSize'] = 11

        document.styles['subheader_2'] = subHeader2Style

        let subHeaderNotBodyStyle: any = {}
        subHeaderNotBodyStyle['fontSize'] = 15
        document.styles['subheader_notbold'] = subHeaderNotBodyStyle

        let infoTable: any = {}
        infoTable['margin'] = [0, 10]
        document.styles['info_table'] = infoTable

        let questionHeaderText: any = {}
        questionHeaderText['fontSize'] = 16,
        questionHeaderText['bold'] = true,
        questionHeaderText['alignment'] = 'center',
        document.styles['question_header'] = questionHeaderText

        let questionTitle : any = {}
        questionTitle['fontSize'] = 12,
        questionTitle['bold'] = true,
        questionTitle['margin'] = [0, 10, 0, 10]
        document.styles['question_title'] = questionTitle
    }
}