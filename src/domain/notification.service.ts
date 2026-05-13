import { Notification } from './notification.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class notificationService{

  private readonly API ='http://localhost:8000/api/notification';
  constructor(
    private http: HttpClient,
  ){}

  listAll() : Observable<Notification[]>{
    return this.http.get<Notification[]>(`${this.API}/listNotifications`);
  }

  generatorMsg(notification: string) : Observable<any>{
    return this.http.get<Notification[]>(`${this.API}/generator`);
  }


}
