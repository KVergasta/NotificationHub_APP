import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {

  notificacaoEscolhida: string | undefined;
  isDropdownOpen = false;
  motivoSelecionado = 'Reason to contact me';

  formEmail = new FormGroup({
    email: new FormControl(''),
    assunto: new FormControl(''),
    mensagem: new FormControl(''),
  })
  formPush = new FormGroup({
    email: new FormControl(''),
    mensagem: new FormControl('')
  })
  formFeedback = new FormGroup({
    email: new FormControl(''),
    motivo: new FormControl(''),
    mensagem: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
    this.notificacaoEscolhida = 'email';
  }

  tipoDenotificacao(notificacao:string){
    return this.notificacaoEscolhida = notificacao;
  }

  toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

selecionarMotivo(motivo: string) {
  this.motivoSelecionado = motivo;
  this.isDropdownOpen = false;
}
}
