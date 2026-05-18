import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationEntity } from "./notificacao.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService{
  private readonly API ='http://localhost:8000/api/notification';

  // subject para atualizar a lista de forma automática
  private refreshSignal$ = new BehaviorSubject<void>(undefined);

  constructor(
    private http: HttpClient,
  ){}

  get refresh$(){
    return this.refreshSignal$.asObservable();
  }

  listAll() : Observable<NotificationEntity[]>{
    return this.http.get<NotificationEntity[]>(`${this.API}/listNotifications`);
  }

  generatorEmail(notification: NotificationEntity) : Observable<any>{
    return this.http.post<any>(`${this.API}/mail`, notification).pipe(
     tap(() => {
        this.refreshSignal$.next();
      })
    );
  }

  generatorPush(notification: NotificationEntity) : Observable<any>{
    return this.http.post<any>(`${this.API}/push`, notification);
  }

  todayByIp() : Observable<any>{
    return this.http.get<NotificationEntity[]>(`${this.API}/todayByIp`);
  }


}
