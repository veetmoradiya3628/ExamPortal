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
            content: [
                {
                    text: 'Quiz Attempt Report',
                    style: 'header'
                },
                {
                    text: 'Quiz : ' + data.quiz.quizTitle,
                    style: 'quiz_title'
                },
                {
                    columns: [
                        {
                            width: '25%',
                            text: 'Student : \n' + data.attemptedUsername,
                            style: 'font_title'
                        },
                        {
                            width: '25%',
                            text: 'Duration : \n' + data.quiz.duration,
                            style: 'font_title'
                        },
                        {
                            width: '25%',
                            text: 'Started At : \n' + new Date(data.quizAttempt.attemptStartedAt),
                            style: 'font_title'
                        },
                        {
                            width: '25%',
                            text: 'Completed At : \n' + new Date(data.quizAttempt.attemptEndedAt),
                            style: 'font_title'
                        }
                    ]

                }
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    alignment: 'center'
                },
                quiz_title: {
                    margin: [1, 8],
                    fontSize: 16,
                },
                font_title: {
                    margin: [1, 8],
                    fontSize: 12
                }
            },
        };

        pdfMake.createPdf(docDefinition).open();
    }
}