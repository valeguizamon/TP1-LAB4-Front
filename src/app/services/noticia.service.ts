import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Noticia } from '../models/noticia'

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private direccion: string = 'http://localhost:8080/api/v1/crud/noticia';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.direccion+"/");
  }

  public getAllPaginate(page:number, size: number,sort: string, order: string): Observable<any>{
    return this.http.get<any[]>(this.direccion+`/pagina?page=${page}&size=${size}&sort=${sort},${order}`);
  }

  public getLastFiveNoticias(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.direccion+`/firstFive`);
  }

  public searchNoticiaByTituloOrResumen(query: string): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.direccion+`/search?query=${query}`)
  }

  public getOne(id: number): Observable<Noticia>{
    return this.http.get<Noticia>(this.direccion+"/"+id);
  }

  public post(noticia: Noticia): Observable<Noticia>{
    return this.http.post<Noticia>(this.direccion+"/", noticia);
  }

  public postWithFoto(formData: FormData):Observable<Noticia>{
    return this.http.post<Noticia>(this.direccion+"/crear-con-foto", formData);
  }

  public put(noticia: Noticia, id:number): Observable<Noticia>{
    return this.http.put<Noticia>(this.direccion+`/${id}`, noticia);
  }

  public putWithFoto(formData: FormData,id: number): Observable<Noticia>{
    return this.http.put<Noticia>(this.direccion+"/editar-con-foto/"+id, formData);
  }

  public delete(id:number): any{
    return this.http.delete<any>(this.direccion+"/"+id);
  }

}
