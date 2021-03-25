import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  empresa: Empresa;

  constructor(private empresaSvc: EmpresaService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.empresaSvc.getOne(this.route.snapshot.params['empresa']).subscribe(e=>this.empresa = e)
  }

}
