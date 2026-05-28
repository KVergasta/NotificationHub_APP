import { NotificationEntity } from '../../domain/notificacao.model';
import { NotificationService } from './../../domain/notification.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelType } from 'src/domain/channelType.enum';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { ToastrService } from 'ngx-toastr';

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

  formEmail: FormGroup;
  formPush: FormGroup;
  formFeedback: FormGroup;

  // Variável para controle local caso queira exibir na tela
  userToken: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private notification: NotificationService
  ) {
    this.formEmail = this.fb.group({
      infoUser: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.formPush = this.fb.group({
      infoUser: [''], // Deixamos sem o Validators.required rígido para o fluxo assíncrono preencher
      title: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.formFeedback = this.fb.group({
      infoUser: ['kauvergasta12@gmail.com', Validators.required],
      subject: ['', Validators.required],
      others: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    try{
      this.requestPermission();
      this.listen();
    } catch (error) {
      console.error(error);
    }
    this.typeNotification = 'push';
  }

  tipoDenotificacao(notificacao: string) {
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

  channelSelected(option: string) {
    this.typeNotification = option;
  }

  saveEmailNotification() {
    if (this.emailValid()) {
      const emailRequest: NotificationEntity = {
        infoUser: this.formEmail.get('infoUser')?.value,
        title: this.formEmail.get('subject')?.value,
        message: this.formEmail.get('message')?.value,
        type: ChannelType.EMAIL,
      };
      this.notification.generatorEmail(emailRequest)
        .subscribe({
          next: (response) => {
            this.msgSucess("Email is sent!");
            this.formEmail.reset();
          },
          error: (error) => { alert("Error sending email"); }
        });
    }
  }

  emailValid() {
    let valido: boolean = this.formEmail.valid && this.formEmail.get('infoUser')?.value.includes('@') && this.formEmail.get('infoUser')?.value.includes('.com');
    return valido;
  }

  savePushNotification() {
    // Forçamos a validação apenas do título e mensagem se o token demorar a carregar
    if (this.formPush.valid) {
      const tokenAtual = this.formPush.get('infoUser')?.value || this.userToken;

      const pushRequest: NotificationEntity = {
        infoUser: tokenAtual, // O Token do Firebase gerado vai aqui como endereço de destino!
        title: this.formPush.get('title')?.value,
        message: this.formPush.get('message')?.value,
        type: ChannelType.PUSH,
      };

      this.notification.generatorPush(pushRequest).subscribe({
        next: (response) => {
          this.toastr.show(this.formPush.get('title')?.value, this.formPush.get('message')?.value);
          this.formPush.reset();
          // Mantém o token preenchido no formulário para novos testes sem precisar recarregar
          this.formPush.patchValue({ infoUser: tokenAtual });
        },
        error: (error) => { alert("Error sending push"); }
      });
    }
  }

  saveFeedbackNotification() {
    if (this.formFeedback.valid) {
      const feedbackRequest: NotificationEntity = {
        title: this.formFeedback.get('subject')?.value,
        infoUser: this.formFeedback.get('infoUser')?.value,
        message: this.formFeedback.get('message')?.value,
        type: ChannelType.EMAIL,
      };
      if (feedbackRequest.title == 'Others') {
        feedbackRequest.title = this.formFeedback.get('others')?.value;
      }

      this.notification.generatorEmail(feedbackRequest)
        .subscribe({
          next: (response) => {
            this.msgSucess("Email is sent!");
            this.formFeedback.reset();
            this.formFeedback.patchValue({
              infoUser: "kauvergasta12@gmail.com"
            });
          },
          error: (error) => { alert("Error sending email" ); }
        });
    }
  }
requestPermission() {
    if (!('Notification' in window)) {
      console.log('Este navegador não suporta notificações.');
      return;
    }

    Notification.requestPermission().then((permission) => {
      console.log("Permissão do navegador analisada:", permission);

      if (permission === 'granted') {
        // 1. Registra explicitamente o arquivo na raiz
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log("Service Worker registrado. Status atual do escopo:", registration.scope);

            // 2. FUNÇÃO AUXILIAR: Garante a ativação antes de pedir o token
            const obterTokenSeguro = (reg: ServiceWorkerRegistration) => {
              getToken(messaging, {
                vapidKey: "BEL83LARrx2dOlTLg63FNsgFjxRo6cy9evhvVkeCLf_vnXOAG485ZJHmE9asvPI7Rzbfy13unAUlhjQpVR6id4g",
                serviceWorkerRegistration: reg
              })
              .then((currentToken: any) => {
                if (currentToken) {
                  this.userToken = currentToken;
                  this.formPush.patchValue({ infoUser: currentToken });
                }
              })
              .catch((err: any) => {
                console.error("Erro interno ao buscar o token:", err);
              });
            };

            // 3. SEGREDO DO SUCESSO: Se já estiver ativo, vai direto. Se não, espera o evento!
            if (registration.active) {
              obterTokenSeguro(registration);
            } else {
              const sw = registration.installing || registration.waiting;
              if (sw) {
                sw.addEventListener('statechange', (e: any) => {
                  if (e.target.state === 'activated') {
                    console.log("Service worker acabou de ativar de forma assíncrona!");
                    obterTokenSeguro(registration);
                  }
                });
              }
            }

          })
          .catch((err) => {
            console.error("Falha ao registrar o arquivo do Service Worker:", err);
          });
      }
    });
  }

  listen() {
      onMessage(messaging, (incomingMessage: any) => {
        console.log("Push recebido em tempo real (Primeiro Plano):", incomingMessage);
        const title = incomingMessage.notification?.title || this.formPush.get('title')?.value || 'Nova Notificação';
        const body = incomingMessage.notification?.body || this.formPush.get('message')?.value || 'Você recebeu uma nova notificação.';
      });
    }

    msgSucess(txt:string){
      this.toastr.info(txt, 'Sucess', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right',
      });
    }
  }
