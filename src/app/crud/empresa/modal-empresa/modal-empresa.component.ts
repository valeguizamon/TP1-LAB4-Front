import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css']
})
export class ModalEmpresaComponent implements OnInit, OnChanges {

  @ViewChild('btnClose') btnClose : ElementRef;
  @Input() item: Empresa;

  public empForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private empresaSvc: EmpresaService) {
    this.buildFormEmp();
  }


  ngOnChanges(): void {
    this.buildFormEmp(this.item);
  }

  ngOnInit(): void {
  }

  private buildFormEmp(emp: Empresa = null): void {
    if(emp){
      this.empForm.patchValue({
        denominacion: emp.denominacion,
        telefono: emp.telefono,
        inicio: emp.inicio,
        cierre: emp.cierre,
        lat: emp.lat,
        lon: emp.lon,
        domicilio: emp.domicilio,
        email: emp.email,
        quienSomos: emp.quienSomos
      });
    } else {
      this.empForm = this.formBuilder.group({
        denominacion: ['', Validators.required],
        telefono: ['', Validators.required],
        inicio: ['', Validators.required],
        cierre: ['', Validators.required],
        quienSomos: ['', Validators.required],
        lat: [0, Validators.required],
        lon: [0, Validators.required],
        domicilio: ['', Validators.required],
        email: ['', Validators.required]
      });
    }
  }
  get denominacion(){return this.empForm.get("denominacion");}
  get telefono(){return this.empForm.get("telefono");}
  get inicio(){return this.empForm.get("inicio");}
  get cierre(){return this.empForm.get("cierre");}
  get quienSomos(){return this.empForm.get("quienSomos");}
  get lat(){return this.empForm.get("lat");}
  get lon(){return this.empForm.get("lon");}
  get domicilio(){return this.empForm.get("domicilio");}
  get email(){return this.empForm.get("email");}

  public onSave(e: Event): void {
    e.preventDefault();
    let inicio = this.empForm.get('inicio').value;
    let cierre = this.empForm.get('cierre').value;
    if(inicio.length == 5){
      inicio = inicio+":00"
    }
    if(inicio.cierre == 5){
      cierre = cierre+":00"
    }
    this.empForm.get('inicio').setValue(inicio);
    this.empForm.get('cierre').setValue(cierre);
    if(this.item && this.item.id) {
      this.empresaSvc.put(this.empForm.value, this.item.id).subscribe(data=>console.log(data));
    } else {
      this.empresaSvc.post(this.empForm.value).subscribe(data=>console.log(data));
    }
    this.closeModal();
  }

  public closeModal(): void {
    this.item = null;
    this.resetForm();
    this.btnClose.nativeElement.click();
  }

  public resetForm(): void {
    this.empForm.reset();
  }
}
