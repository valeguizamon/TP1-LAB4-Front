import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-abm-empresa',
  templateUrl: './abm-empresa.component.html',
  styleUrls: ['./abm-empresa.component.css']
})
export class AbmEmpresaComponent implements OnInit {

  public emp: Empresa;
  public list$: Observable<Empresa[]> 

  constructor(private empresaSvc: EmpresaService) { }

  ngOnInit(): void {
    this.list$ = this.empresaSvc.getAll();
  }

  public edit(item: Empresa): void{
    this.emp = item;
  }

  public delete(e: Event, id: number): void {
    e.preventDefault();
    e.stopPropagation();
    let resp:boolean = confirm('¿ Desea eliminar esta empresa ?');
    if(resp){
      this.empresaSvc.delete(id).subscribe(data=> console.log('Eliminado'), error=>console.error(error));
    }
  }
}
