import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JserviceService {
  constructor(private httpClient: HttpClient) {}

  private url = "http://jservice.io/api/";
  private random = "random";
  private categories = "categories";
  private clues = "clues";

  getRandomQuestion(): Observable<any> {
    return this.httpClient.get(`${this.url}${this.random}`);
  }

  getCategories(): Observable<any> {
    let httpParams = new HttpParams().set("count", "50");
    let options = { params: httpParams };
    return this.httpClient.get(`${this.url}${this.categories}`, options);
  }

  getQuestionByCategory(questionId: string): Observable<any> {
    let httpParams = new HttpParams().set("category", `${questionId}`);
    let options = { params: httpParams };
    return this.httpClient.get(`${this.url}${this.clues}`, options);
  }
}
