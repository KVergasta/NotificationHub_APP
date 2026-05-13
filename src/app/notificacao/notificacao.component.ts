import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {

  notificacaoEscolhida: string | undefined;
  isDropdownOpen = false;
  motivoSelecionado = 'Reason to contact me';

  formEmail: FormGroup;
  formPush: FormGroup;
  formFeedback: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formEmail = this.fb.group({
      address:['', Validators.required],
      subject:['', Validators.required],
      message:['', Validators.required]
    })
    this.formPush = this.fb.group({
      title:['', Validators.required],
      message:['', Validators.required]
    })
    this.formFeedback = this.fb.group({
      address:['kauvergasta12@gmail.com', Validators.required],
      title:['', Validators.required],
      message:['', Validators.required]
    })
   }

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

  salvar(){
    let dados;
    if (this.formEmail.valid ) {
      dados = this.formEmail.value
    } else if (this.formFeedback.valid) {
      dados = this.formFeedback.value
    }
  }
}
