import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NotificationEntity } from "./notificacao.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService{

  private readonly API ='http://localhost:8000/api/notification';
  constructor(
    private http: HttpClient,
  ){}

  listAll() : Observable<NotificationEntity[]>{
    return this.http.get<NotificationEntity[]>(`${this.API}/listNotifications`);
  }

  generatorEmail(notification: NotificationEntity) : Observable<any>{
    return this.http.post<any>(`${this.API}/generator`, notification);
  }
  generatorPush(notification: NotificationEntity) : Observable<any>{
    return this.http.post<any>(`${this.API}/generator`, notification);
  }


}
