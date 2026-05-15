import { NotificationEntity } from '../../domain/notificacao.model';
import { NotificationService } from './../../domain/notification.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      title:['', Validators.required],
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

  selectOption(option: string) {
    this.typeNotification = option;
    this.isDropdownOpen = false;
  }

  saveEmailNotification(){
    console.log("formualario valido? ", this.formEmail.valid)
    if(this.formEmail.valid){
      const emailRequest: NotificationEntity = {
        infoUser: this.formEmail.get('infoUser')?.value,
        subject: this.formEmail.get('subject')?.value,
        message: this.formEmail.get('message')?.value
      }
      this.notification.generatorMsg(emailRequest)
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
        subject: this.formPush.get('title')?.value,
        message: this.formPush.get('message')?.value
      }
      this.notification.generatorMsg(pushRequest);
    }
  }

  saveFeedbackNotification(){
    if(this.formFeedback.valid){
      const feedbackRequest: NotificationEntity = {
        infoUser: this.formFeedback.get('infoUser')?.value,
        subject: this.formFeedback.get('subject')?.value,
        message: this.formFeedback.get('message')?.value
      }
      this.notification.generatorMsg(feedbackRequest);
    }
  }
}
