import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';

import { Noticia } from 'src/app/models/noticia';
import { EmpresaService } from 'src/app/services/empresa.service';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'modal-noticia',
  templateUrl: './modal-noticia.component.html',
  styleUrls: ['./modal-noticia.component.css']
})
export class ModalNoticiaComponent implements OnInit, OnChanges {

  @ViewChild('btnClose') btnClose : ElementRef;
  @Input() item: Noticia;

  public empresas$: Observable<Empresa[]>;
  public noticiaForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private noticiaSvc: NoticiaService, private empSvc: EmpresaService) {
    this.buildFormNoticia();
  }

  ngOnChanges(): void {
    console.log(this.item);
    
    this.buildFormNoticia(this.item);
  }

  ngOnInit(): void {
    this.empresas$ = this.empSvc.getAll();
  }

  private buildFormNoticia(noticia: Noticia = null): void {
    if(noticia){
      this.noticiaForm.patchValue({
        titulo: noticia.titulo,
        resumen: noticia.resumen,
        img: noticia.imagenNoticia,
        contenidoHtml: noticia.contenidoHtml,
        publicada: noticia.publicado,
        fecha: noticia.fecha,
        empresa: noticia.empresa.id
      });
    } else {
      this.noticiaForm = this.formBuilder.group({
        titulo: ['', Validators.required],
        resumen: ['', Validators.required],
        img: ['', Validators.required],
        contenidoHtml: ['', Validators.required],
        publicada: [false, Validators.required],
        fecha: ['', Validators.required],
        empresa: ['', Validators.required],
      });
    }
  }

  public onSave(e: Event): void {
    e.preventDefault();
    console.log(this.noticiaForm.value);
    if(this.item && this.item.id) {
      this.noticiaSvc.put(this.noticiaForm.value, this.item.id).subscribe(data=>console.log(data));
    } else {
      this.noticiaSvc.post(this.noticiaForm.value).subscribe(data=>console.log(data));
    }
    this.closeModal();
  }

  public closeModal(): void {
    this.item = null;
    this.resetForm();
    this.btnClose.nativeElement.click();
  }

  public resetForm(): void {
    this.noticiaForm.reset();
  }

}
