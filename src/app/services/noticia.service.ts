import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Noticia } from '../models/noticia'

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private direccion: string = 'http://localhost:8080/api/v1/crud/noticia/';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.direccion);
  }

  public getOne(id: number): Observable<Noticia>{
    return this.http.get<Noticia>(`${this.direccion+id}`);
  }

  public post(noticia: Noticia): Observable<Noticia>{
    return this.http.post<Noticia>(this.direccion, noticia);
  }

  public put(noticia: Noticia, id:number): Observable<Noticia>{
    return this.http.put<Noticia>(`${this.direccion+id}`, noticia);
  }

  public delete(id:number): any{
    return this.http.delete<any>(`${this.direccion+id}`);
  }
  
}
