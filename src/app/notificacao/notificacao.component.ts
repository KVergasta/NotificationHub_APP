import { NotificationEntity } from '../../domain/notificacao.model';
import { NotificationService } from './../../domain/notification.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ChannelType } from 'src/domain/channelType.enum';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Inicializa o app e o serviço de mensageria para o TypeScript reconhecer
const app = initializeApp(environment.firebaseConfig);
const messaging = getMessaging(app);

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})

export class NotificacaoComponent implements OnInit {

  typeNotification: string | undefined;
  isDropdownOpen = false;
  reasonSelected = 'Reason to contact me';
  user: string = 'USER_PUSH';

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
      infoUser:[this.user, Validators.required],
      title:['', Validators.required],
      message:['', Validators.required]
    })
    this.formFeedback = this.fb.group({
      infoUser:['kauvergasta12@gmail.com', Validators.required],
      subject:['', Validators.required],
      others:[''],
      message:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.typeNotification = 'email';
    this.requestPermission();
    this.listen();
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

    if(this.emailValid()){
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

  emailValid(){
    let valido: boolean = this.formEmail.valid && this.formEmail.get('infoUser')?.value.includes('@') && this.formEmail.get('infoUser')?.value.includes('.com');
    return valido;
  }

  savePushNotification(){
    if(this.formPush.valid){
      const pushRequest: NotificationEntity = {
        infoUser: this.formPush.get('infoUser')?.value, // Isso vai ter que ser preenchido de forma diferente - já que o push deve aparecer no navegador do usuário
        title:  this.formPush.get('title')?.value,
        message: this.formPush.get('message')?.value,
        type: ChannelType.PUSH,
      }
      this.notification.generatorPush(pushRequest).subscribe({
        next:(response)=> {console.log("Push is sent", response);
          this.formPush.reset();
          this.formPush.patchValue({
            infoUser: this.user
          });
        }, error: (error) => {console.error("Error",error)}
      });
    }
  }

  saveFeedbackNotification(){
    console.log(this.formFeedback.value);
    console.log(this.formFeedback.valid);
    if(this.formFeedback.valid){

      const feedbackRequest: NotificationEntity = {
        title: this.formFeedback.get('subject')?.value,
        infoUser: this.formFeedback.get('infoUser')?.value,
        message: this.formFeedback.get('message')?.value,
        type: ChannelType.EMAIL,
      }
      if (feedbackRequest.title == 'Others') {
        feedbackRequest.title = this.formFeedback.get('others')?.value;
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

  requestPermission() {
    navigator.serviceWorker.ready.then((registration) => {
      getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey })
        .then((currentToken: any) => {
          this.user = currentToken;
          if (currentToken) {
            console.log("Seu Token Firebase:", currentToken);
          } else {
            console.log('Token inválido. Solicite uma nova permissão para gerar o token');
          }
        })
        .catch((err: any) => {
          console.log("Erro ao buscar o token:", err);
        });

    }).catch((err) => {
      console.error("Service Worker não ficou pronto a tempo:", err);
    });
  }

  listen(){
    onMessage(messaging, (incomingMessage: any)=>{
    // console.log(incomingMessage);
    alert(`[${incomingMessage.notification.title}]: ${incomingMessage.notification.body}`);
    })
  }
}
