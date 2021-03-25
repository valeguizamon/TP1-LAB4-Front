import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-abm-empresa',
  templateUrl: './abm-empresa.component.html',
  styleUrls: ['./abm-empresa.component.css']
})
export class AbmEmpresaComponent implements OnInit {

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

  public emp: Empresa;
  public empresas: any;

  constructor(private empresaSvc: EmpresaService) {
  this.getAllEmpresas()
  }

  ngOnInit(): void {
  }

  getAllEmpresas(){
    this.empresaSvc.getAllPaginate(this.page,5,this.sort,this.order).subscribe(e=> {
      this.empresas = e
      this.paginationContent = e;
      this.isFirst = this.paginationContent.first;
      this.isLast = this.paginationContent.last;
    })
  }

  public edit(item: Empresa): void{
    this.emp = item;
  }

  public delete(e: Event, id: number): void {
    e.preventDefault();
    e.stopPropagation();
    let resp:boolean = confirm('¿ Desea eliminar esta empresa ?');
    if(resp){
      this.empresaSvc.delete(id).subscribe(data=> console.log('Empresa eliminada'), error=>console.error(error));
    }
  }

  public next(){
    this.page++;
    this.getAllEmpresas()
  }
  public previous(){
    this.page--;
    this.getAllEmpresas()
  }

  public sortBy(sort: string){
    this.sort = sort;
    if(this.order == 'asc'){
      this.order = 'desc';
    }else{
      this.order = 'asc'
    }
    console.log(this.order);
    this.getAllEmpresas()
  }

}
