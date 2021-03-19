import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abm-noticia',
  templateUrl: './abm-noticia.component.html',
  styleUrls: ['./abm-noticia.component.css']
})
export class AbmNoticiaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  delete(e: Event, id: string): void {
    let resp:boolean = confirm('¿ Desea eliminar esta empresa ?');

    if(resp){
      console.log('Eliminado');
    }
  }
}
