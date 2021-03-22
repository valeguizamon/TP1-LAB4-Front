import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-abm-noticia',
  templateUrl: './abm-noticia.component.html',
  styleUrls: ['./abm-noticia.component.css']
})
export class AbmNoticiaComponent implements OnInit {

  public not: Noticia;
  public list$: Observable<Noticia[]>

  constructor(private noticiaSvc: NoticiaService) { }

  ngOnInit(): void {
    this.list$ = this.noticiaSvc.getAll();
  }

  public edit(item: Noticia): void{
    this.not = item;
  }

  public delete(e: Event, id: number): void {
    e.preventDefault();
    e.stopPropagation();
    let resp:boolean = confirm('¿ Desea eliminar esta noticia ?');
    if(resp){
      this.noticiaSvc.delete(id).subscribe(data=> console.log('Noticia eliminada'), error=>console.error(error));
    }
  }
}
