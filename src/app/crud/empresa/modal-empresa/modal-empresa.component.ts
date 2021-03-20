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

  public onSave(e: Event): void {
    e.preventDefault();
    console.log(this.empForm.value);
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
