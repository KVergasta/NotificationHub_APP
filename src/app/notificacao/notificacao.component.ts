import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { NotificationEntity } from '../../domain/notificacao.model';
import { NotificationService } from './../../domain/notification.service';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ChannelType } from 'src/domain/channelType.enum';
import { Subject } from 'rxjs';
// import { StatusNotification } from 'src/domain/statusNotification.enum';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})

export class NotificacaoComponent implements OnInit {

  typeNotification: string | undefined;
  isDropdownOpen = false;
  reasonSelected = 'Reason to contact me';

  formEmail: FormGroup;
  formPush: FormGroup;
  formFeedback: FormGroup;


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private notification: NotificationService)
    {
    this.formEmail = this.fb.group({
      infoUser:['', Validators.required],
      subject:['', Validators.required],
      message:['', Validators.required]
    })
    this.formPush = this.fb.group({
      title:['', Validators.required],
      message:['', Validators.required]
    })
    this.formFeedback = this.fb.group({
      infoUser:['kauvergasta12@gmail.com', Validators.required],
      subject:['', Validators.required],
      message:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.typeNotification = 'email';
  }

  tipoDenotificacao(notificacao:string){
    return this.typeNotification = notificacao;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string, event: Event) {
    event.preventDefault();
    this.isDropdownOpen = false;
    this.reasonSelected = option;

    this.formFeedback.patchValue({
      subject: option
    });
  }

  channelSelected(option: string){
    this.typeNotification = option;
  }

  saveEmailNotification(){
    if(this.formEmail.valid){
      const emailRequest: NotificationEntity = {
        infoUser: this.formEmail.get('infoUser')?.value,
        title: this.formEmail.get('subject')?.value,
        message: this.formEmail.get('message')?.value,
        type: ChannelType.EMAIL,
      }
      this.notification.generatorEmail(emailRequest)
      .subscribe({
        next:(response)=> {console.log("Email is sent", response);
          this.formEmail.reset();
        }, error: (error) => {console.error("Error",error)}
      });
    }
  }

  savePushNotification(){
    if(this.formPush.valid){
      const pushRequest: NotificationEntity = {
        infoUser: this.formPush.get('infoUser')?.value, // Isso vai ter que ser preenchido de forma diferente - já que o push deve aparecer no navegador do usuário
        title: this.formPush.get('title')?.value,
        message: this.formPush.get('message')?.value,
        type: ChannelType.PUSH,
      }
      this.notification.generatorPush(pushRequest);
    }
  }


  saveFeedbackNotification(){
    console.log("form valid ", this.formFeedback.valid)
    if(this.formFeedback.valid){

      const feedbackRequest: NotificationEntity = {
        title: this.formFeedback.get('subject')?.value,
        message: this.formFeedback.get('message')?.value,
        type: ChannelType.EMAIL,
      }
      this.notification.generatorEmail(feedbackRequest)
      .subscribe({
        next:(response)=> {console.log("Email is sent", response);
          this.formFeedback.reset();
          this.formFeedback.patchValue({
      infoUser: 'kauvergasta12@gmail.com'
      });
        }, error: (error) => {console.error("Error",error)}
      });
    }
  }
}
