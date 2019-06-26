import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from 'app/services/perfil.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'app/components/snackbar/snackbar.component';
import { NotificationsComponent } from '../notifications/notifications.component';
declare var $: any;


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],

})
export class UserProfileComponent implements OnInit {

  messageSuccess = 'Perfil atualizado!';
  messageError = 'Ops Algo deu errado!!!';

  perfilForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private perfilService: PerfilService, private snackBar: MatSnackBar) {

    this.perfilForm = this.formBuilder.group({
      id: null,
      aluno: null,
      nome_completo: '',
      data_nascimento: null,
      responsavel_financeiro: '',
      cpf_responsavel_financeiro: '',
      cep: '',
      rua: '',
      bairro: '',
      cidade: '',
      estado: '',
      complemento: '',
      email: '',
      email_responsavel: '',
      telefone_residencial: '',
      telefone_comercial: '',
      celular: '',
      experiencia_teatro: '',
      como_ficou_sabendo: '',
      documento_identidade: null,
      fotos_exibicao: [],
    })

    this.perfilService.getPerfil.subscribe(
      response => {

        if (response[0] != undefined) {
          response[0].celular = response[0].celular.replace('+55', '')
          response[0].telefone_comercial = response[0].telefone_comercial.replace('+55', '')
          response[0].telefone_residencial = response[0].telefone_residencial.replace('+55', '')
          this.perfilForm.setValue(response[0])
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() { }

  onSubmit() {
    this.perfilService.submitForm(this.perfilForm.value).subscribe(
      response => {
        //this.openSnackBar(this.messageSuccess, 'success-snackbar');
        this.showNotification('success', this.messageSuccess)
      },
      err => {
        //this.openSnackBar(this.messageError, 'error-snackbar');
        this.showNotification('danger', this.messageError)
      });
  }

  /*openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      verticalPosition: "top",
      panelClass: panelClass,
    });
  }*/

  showNotification(type, message) {

    // const type = ['','info','success','warning','danger'];


    $.notify({
      icon: "notifications",
      message: message

    }, {
        type: type,
        timer: 4000,
        placement: {
          from: 'top',
          align: 'center'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
}
