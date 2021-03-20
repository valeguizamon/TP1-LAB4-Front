import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Empresa } from '../models/empresa'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  direccion : string = 'http://localhost:port/api/v1/empresa';

  constructor(private http: HttpClient) {}

  getAll(){
    this.http.get(this.direccion);
  }

  getOne(id:number){
    this.http.get(this.direccion + id);
  }

  post(empresa:Empresa){
    this.http.post(this.direccion, empresa);
  }

  put(id:number, empresa:Empresa){
    this.http.post(this.direccion + id, empresa);
  }

  delete(id:number){
    this.http.delete(this.direccion + id);
  }

}

