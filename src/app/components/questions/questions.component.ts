import { Component, OnInit } from "@angular/core";
import { JserviceService } from "src/app/services/jservice/jservice.service";
import { Select2OptionData } from "ng-select2";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"],
})
export class QuestionsComponent implements OnInit {
  randomQuestion: Array<any>;
  answer: string;
  answerForValidation: string;
  categoriesS2: Array<Select2OptionData>;
  selectedCategoryId: string;
  answerTimer;
  usersAnswer: string;

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
    this.answer = "";
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
    if (this.usersAnswer === this.answerForValidation) {
      console.log("A válasz helyes");
    } else {
      console.log("A válasz helytelen");
      console.log(this.usersAnswer);
      console.log(this.answerForValidation);
    }
  }
}
