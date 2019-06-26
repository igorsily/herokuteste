import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment.prod'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  submitForm(data): Observable<any> {
    
    data.celular = data.celular.indexOf('+55') >= 0? data.celular : `+55${data.celular}`
    data.telefone_residencial = data.telefone_residencial.indexOf('+55') >= 0? data.telefone_residencial : `+55${data.telefone_residencial}`;
    data.telefone_comercial = data.telefone_comercial.indexOf('+55') >= 0? data.telefone_comercial :  `+55${data.telefone_comercial}`;

    if (data.id != null) {

      return this.http.put(`${environment.apiUrl}/api/cadastroAluno/${data.id}/`, data)

    }
    return this.http.post(`${environment.apiUrl}/api/cadastroAluno/`, data)

  }

  get getPerfil() {

    return this.http.get(`${environment.apiUrl}/api/cadastroAluno/`)


  }

}
