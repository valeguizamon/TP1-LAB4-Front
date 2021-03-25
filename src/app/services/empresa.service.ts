import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Empresa } from '../models/empresa'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private direccion: string = 'http://localhost:8080/api/v1/crud/empresa/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.direccion);
  }

  public getAllPaginate(page:number, size: number,sort: string,order: string): Observable<any>{
    return this.http.get<any>(this.direccion+`/pagina?page=${page}&size=${size}&sort=${sort},${order}`);
  }

  public getOne(id: number): Observable<Empresa>{
    return this.http.get<Empresa>(`${this.direccion+id}`);
  }

  public post(empresa: Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(this.direccion, empresa);
  }

  public put(empresa: Empresa, id:number): Observable<Empresa>{
    return this.http.put<Empresa>(`${this.direccion+id}`, empresa);
  }

  public delete(id:number): any{
    return this.http.delete<any>(`${this.direccion+id}`);
  }

}
