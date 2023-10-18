import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Option } from 'src/app/models/options.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-attempt',
  templateUrl: './question-attempt.component.html',
  styleUrls: ['./question-attempt.component.scss']
})
export class QuestionAttemptComponent implements OnInit {

  public ques!: Question;
  public questionInd!: number;
  selectedOption: string = "";
  selectedOptionsForm = this._formBuilder.group({
    option_1: false,
    option_2: false,
    option_3: false,
    option_4: false,
    option_5: false
  })
  selectedOptions: Array<Option> = [];

  @Input()
  set questionIndex(questionIndex: number) {
    this.questionInd = questionIndex;
  }

  @Input()
  set question(question: Question) {
    // handling last loaded question
    if (this.ques) {
      if (this.ques.questionType === 'SINGLE_CORRECT' || this.ques.questionType === 'TRUE_FALSE') {
        for (let index = 0; index < this.ques.options.length; index++) {
          if (this.ques.options[index].optionText === this.selectedOption) {
            this.selectedOptions.push(this.ques.options[index]);
          }
        }
        console.log(this.selectedOptions);
        localStorage.setItem(this.questionInd.toString(), JSON.stringify(this.selectedOptions));
      } else {
        for(const [k, v] of Object.entries(this.selectedOptionsForm.value)){
          console.log(`key : ${k}, value : ${v}`);
          if(v){
            this.selectedOptions.push(this.ques.options[parseInt(k.substring(k.length - 1)) - 1]);
          }
          console.log(this.selectedOptions);
        }
        localStorage.setItem(this.questionInd.toString(), JSON.stringify(this.selectedOptions));
      }
    }

    this.ques = question;
    this.selectedOption = "";
    this.selectedOptionsForm.reset();
    this.selectedOptions = [];
    console.log(this.ques);
  };

  constructor(private _formBuilder: FormBuilder) {
    // console.log(this.question);
  }

  ngOnInit(): void {
  }

}
