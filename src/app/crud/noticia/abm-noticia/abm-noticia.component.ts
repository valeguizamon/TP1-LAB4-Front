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

  //Paginacion
  public isFirst: boolean = true;
  public isLast: boolean = false;
  public page:number = 0 ;
  public sort: string = 'id';
  public order: string = 'asc'
  public paginationContent = {
    first:true,
    last:false,
  }
  public not: Noticia;
  public noticias: any;

  constructor(private noticiaSvc: NoticiaService) {
    this.getAllNoticias()
  }

  ngOnInit(): void {

  }

  public getAllNoticias(){
    this.noticiaSvc.getAllPaginate(this.page,5,this.sort,this.order).subscribe(e=>{
      this.noticias = e;
      this.paginationContent = e;
      this.isFirst = this.paginationContent.first;
      this.isLast = this.paginationContent.last;
    })
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


  public next(){
    this.page++;
    this.getAllNoticias()
  }
  public previous(){
    this.page--;
    this.getAllNoticias()
  }

  public sortBy(sort: string){
    this.sort = sort;
    if(this.order == 'asc'){
      this.order = 'desc';
    }else{
      this.order = 'asc'
    }
    console.log(this.order);
    this.getAllNoticias()
  }
}
