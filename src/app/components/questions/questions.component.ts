import { Component, OnInit } from "@angular/core";
import { JserviceService } from "src/app/services/jservice/jservice.service";
import { Select2OptionData } from "ng-select2";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"],
})
export class QuestionsComponent implements OnInit {
  answer: string;
  answerForValidation: string;
  answerTimer;
  categoriesS2: Array<Select2OptionData>;
  usersAnswer: string;
  selectedCategoryId: string;
  randomQuestion: Array<any>;
  validationText: string;
  answerIsValid: boolean;

  constructor(public jService: JserviceService) {}

  ngOnInit() {
    this.newQuestion();
    this.listCategories();
  }

  newQuestion() {
    this.clearShowAnswerTimer();

    if (!this.selectedCategoryId) {
      this.jService.getRandomQuestion().subscribe((randomQuestion) => {
        this.randomQuestion = randomQuestion;
        this.answerHandler();
      });
    } else if (this.selectedCategoryId) {
      this.jService
        .getQuestionByCategory(this.selectedCategoryId)
        .subscribe((questionByCategory) => {
          let ArrLength = questionByCategory.length;
          let randomNum = Math.floor(Math.random() * ArrLength);
          this.randomQuestion = [questionByCategory[randomNum]];
          this.answerHandler();
        });
    }
  }

  answerHandler() {
    this.answerForValidation = this.randomQuestion[0].answer;
    this.usersAnswer = "";
    this.answer = "";
    this.answerIsValid = null;
  }

  showAnswer() {
    this.answerTimer = setTimeout(() => {
      this.answer = this.randomQuestion[0].answer;
    }, 5000);
  }

  clearShowAnswerTimer() {
    clearTimeout(this.answerTimer);
  }

  listCategories() {
    this.jService.getCategories().subscribe((c) => {
      this.categoriesS2 = c.map((c) => {
        return { id: c.id, text: c.title };
      });
    });
  }

  validateAnswer() {
    console.log(this.answerForValidation);
    if (this.usersAnswer) {
      let result: boolean =
        this.answerForValidation
          .toLowerCase()
          .localeCompare(this.usersAnswer.toLowerCase()) === 0;
      result
        ? ((this.answerIsValid = true),
          (this.validationText = "Your answer is correct"))
        : ((this.answerIsValid = false),
          (this.validationText = "Your answer is incorrect"));
    } else {
      this.answerIsValid = undefined;
      this.validationText = "Please answer the question";
    }
  }
}
