import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abm-empresa',
  templateUrl: './abm-empresa.component.html',
  styleUrls: ['./abm-empresa.component.css']
})
export class AbmEmpresaComponent implements OnInit {

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
