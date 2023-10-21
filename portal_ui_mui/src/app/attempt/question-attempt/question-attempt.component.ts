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
  selectedOptionTexts: Array<string> = [];

  @Input()
  set questionIndex(questionIndex: number) {
    this.questionInd = questionIndex;
    this.selectedOptionTexts = [];
    if (localStorage.getItem(this.questionInd.toString())) {
      let selectedOpt = JSON.parse(localStorage.getItem(this.questionInd.toString()) || '{}');
      if (selectedOpt !== '{}') {
        if (this.ques.questionType === 'SINGLE_CORRECT' || this.ques.questionType === 'TRUE_FALSE') {
          // single correct handler
          console.log(selectedOpt[0].optionText);
          this.selectedOption = selectedOpt[0].optionText;
        } else {
          // multiple correct handler
          selectedOpt.forEach((element: any) => {
            this.selectedOptionTexts.push(element.optionText);
          });
          console.log(this.selectedOptionTexts);
          for (let index = 0; index < this.ques.options.length; index++) {
            if (this.selectedOptionTexts.includes(this.ques.options[index].optionText)) {
              console.log(`includes value at index : ${index}`)
              // let optIndex: string =  ('option_' + (index + 1)).toString();
              if ((index + 1) == 1) {
                this.selectedOptionsForm.controls['option_1'].setValue(true);
              } else if ((index + 1) == 2) {
                this.selectedOptionsForm.controls['option_2'].setValue(true);
              } else if ((index + 1) == 3) {
                this.selectedOptionsForm.controls['option_3'].setValue(true);
              } else if ((index + 1) == 4) {
                this.selectedOptionsForm.controls['option_4'].setValue(true);
              } else if ((index + 1) == 5) {
                this.selectedOptionsForm.controls['option_5'].setValue(true);
              }
            }
          }
        }
      }
      console.log(`earlier found`)
    } else {
      console.log(`earlier not found`)
    }
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
        if (this.selectedOptions.length > 0) {
          localStorage.setItem(this.questionInd.toString(), JSON.stringify(this.selectedOptions));
        }
      } else {
        for (const [k, v] of Object.entries(this.selectedOptionsForm.value)) {
          console.log(`key : ${k}, value : ${v}`);
          if (v) {
            this.selectedOptions.push(this.ques.options[parseInt(k.substring(k.length - 1)) - 1]);
          }
          console.log(this.selectedOptions);
        }
        if (this.selectedOptions.length > 0) {
          localStorage.setItem(this.questionInd.toString(), JSON.stringify(this.selectedOptions));
        }
      }
    }

    this.ques = question;
    this.selectedOption = "";
    this.selectedOptionsForm.reset();
    this.selectedOptions = [];
    console.log(this.ques);
  };

  // checkForSelectedEarlier(option: Option){
  //   return this.selectedOptionTexts.includes(option.optionText);
  // }

  constructor(private _formBuilder: FormBuilder) {
    // console.log(this.question);
  }

  ngOnInit(): void {
  }

}
