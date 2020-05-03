import { Component, OnInit } from "@angular/core";
import { JserviceService } from "src/app/services/jservice/jservice.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"],
})
export class QuestionsComponent implements OnInit {
  randomQuestion: Array<any>;
  answer: string;
  categories: Array<any>;
  selectedCategoryId: string;

  constructor(public jService: JserviceService) {}

  ngOnInit() {
    this.newQuestion();
    this.listCategories();
  }

  newQuestion() {
    if (!this.selectedCategoryId) {
      this.jService.getRandomQuestion().subscribe((randomQuestion) => {
        this.randomQuestion = randomQuestion;
        this.answer = "";
      });
    } else if (this.selectedCategoryId) {
      this.jService
        .getQuestionByCategory(this.selectedCategoryId)
        .subscribe((questionByCategory) => {
          let ArrLength = questionByCategory.length;
          let randomNum = Math.floor(Math.random() * ArrLength);
          this.randomQuestion = [questionByCategory[randomNum]];
          this.answer = "";
          console.log(this.randomQuestion);
        });
    }
  }

  showAnswer() {
    setTimeout(() => {
      this.answer = this.randomQuestion[0].answer;
    }, 5000);
  }

  listCategories() {
    this.jService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
