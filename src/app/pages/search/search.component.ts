import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  empresaId: number;

  noticias$: Observable<Noticia[]>

  query: string = "";

  p: number = 1;

  constructor(private route: ActivatedRoute,private noticiaSvc: NoticiaService) {
    this.empresaId = this.route.snapshot.params['empresa'];
    this.route.queryParams.subscribe(e => {
      if(e.query == ''){
        this.noticias$ = this.noticiaSvc.getLastFiveNoticias(this.empresaId);
      }else{
        this.query = e.query;
        this.searchNoticias(this.empresaId,e.query)
      }}
    )
  }

  ngOnInit(): void {
  }

  searchNoticias(id:number,query: string){
    this.noticias$ = this.noticiaSvc.searchNoticiaByTituloOrResumen(id,query)
  }
}
