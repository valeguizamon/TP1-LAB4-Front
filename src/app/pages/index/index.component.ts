import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public list$: Observable<Empresa[]>

  constructor(private empresaSvc: EmpresaService) { }

  ngOnInit(): void {
    this.list$ = this.empresaSvc.getAll();
  }
}
