import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  idNoticia: number;
  noticia: Noticia;
  contenidoHtml: any;
  
  constructor(private route: ActivatedRoute, private noticiaSvc: NoticiaService) {
    this.idNoticia = this.route.snapshot.params['id'];
    this.getNoticia()
  }

  ngOnInit(): void {
  }

  getNoticia(){
    this.noticiaSvc.getOne(this.idNoticia).subscribe(n =>
      {
    this.noticia = n;
    this.contenidoHtml = `${n.content}`
    console.log(n)
    } )
  }

}
