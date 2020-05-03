import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { QuestionsComponent } from "./components/questions/questions.component";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgSelect2Module } from "ng-select2";

@NgModule({
  declarations: [AppComponent, QuestionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelect2Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
