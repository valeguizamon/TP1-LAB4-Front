import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  query: string = "a";

  p: number = 1;

  constructor(private route: ActivatedRoute,private noticiaSvc: NoticiaService,private router: Router) {
    this.empresaId = this.route.snapshot.params['empresa'];
    this.route.queryParams.subscribe(e => this.query = e.query)
    this.searchNoticias()
  }

  ngOnInit(): void {
  }

  searchNoticias(){
    this.noticias$ = this.noticiaSvc.searchNoticiaByTituloOrResumen(this.query)
  }

  // goNoticia(idNoticia: number){
  //   this.router.navigate([`${this.empresaId}/noticia/${idNoticia}`])
  // }

}
