import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class EmailService{

  private readonly API ='http://localhost:8000/api/notifications';
  constructor(
    private http: HttpClient,
  ){}


}
