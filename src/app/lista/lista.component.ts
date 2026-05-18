import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationEntity } from 'src/domain/notificacao.model';
import { NotificationService } from 'src/domain/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit,OnDestroy  {

  notification!: NotificationEntity;
  listNotifications: NotificationEntity[] = [];
  private subSubscription!: Subscription;

  constructor(private service: NotificationService) { }

  ngOnInit(): void {
    this.subSubscription = this.service.refresh$.subscribe(()=>
    {
      this.notificationsByIp();
    })
  }

    notificationsByIp(){
    this.service.todayByIp().subscribe({
      next:(response)=>this.listNotifications=response,
      error:(error)=>{console.log("Error: ", error)}
    })
  }

  clean(){
    this.listNotifications=[];
  }

  ngOnDestroy(): void{
    if(this.subSubscription){
      this.subSubscription.unsubscribe();
    }
  }
}
