import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  get search(){return this.searchForm.get('search')}

  public empresa: Empresa;
  public empresaId: number;

  constructor(private empresaSvc: EmpresaService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.params['empresa'];
    if(this.empresaId != undefined){
      this.empresaSvc.getOne(this.empresaId).subscribe( emp => this.empresa = emp, error => { 
        this.router.navigate(['/error']);
        console.error(error);
      } );
    } 
  }

  searchNoticias(){
    this.router.navigate([this.empresaId+'/search'],{queryParams:{query:this.searchForm.get('search').value}})
  }

}
