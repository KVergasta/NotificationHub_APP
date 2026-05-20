import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationEntity } from "./notificacao.model";
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService{
  private readonly API ='http://localhost:8000/api/notification';
  private readonly VAPID_PUBLIC_KEY :'BHBE8HHXk5Yhs-qI0opfFu-Zi2UdDT3KL7vGXrOtX0GnkwUlBzfpTKVTDHjiHb3-VWNOXzwEMnTPCbZpGmfLleI';
  // subject para atualizar a lista de forma automática
  private refreshSignal$ = new BehaviorSubject<void>(undefined);

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
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

  permissionToUser(){
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub=>{
      console.log('Assinatura gerada com suceso');
      this.http.post('http://localhost:8000/api/notification/push',sub).subscribe();
        })
    .catch(err => console.error('Usuário recusou as notificações ou ocorreu um erro:', err));
  }


}
