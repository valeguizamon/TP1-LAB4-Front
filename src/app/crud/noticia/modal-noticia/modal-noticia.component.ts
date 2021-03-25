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
    this.buildFormNoticia(this.item);
  }

  ngOnInit(): void {
    this.empresas$ = this.empSvc.getAll();
  }

  private buildFormNoticia(noticia: Noticia = null): void {
    if(noticia){
      console.log(noticia)
      this.noticiaForm.patchValue({
        titulo: noticia.titulo,
        resumen: noticia.resumen,
        img: noticia.imagenNoticia,
        contenidoHtml: noticia.content,
        publicada: noticia.publicado,
        fecha: noticia.fecha,
        empresa: noticia.empresa.id
      });
    } else {
      this.noticiaForm = this.formBuilder.group({
        titulo: ['', Validators.required],
        resumen: ['', Validators.required],
        img: [null, Validators.required],
        contenidoHtml: ['', Validators.required],
        publicada: [false, Validators.required],
        fecha: ['', Validators.required],
        empresa: ['', Validators.required],
      });
    }
  }
  get contenidoHtml(){return this.noticiaForm.get("contenidoHtml");}
  get publicada(){return this.noticiaForm.get("publicada");}
  get resumen(){return this.noticiaForm.get("resumen");}
  get titulo(){return this.noticiaForm.get("titulo");}
  get empresa(){return this.noticiaForm.get("empresa");}
  get img(){return this.noticiaForm.get("img");}
  get fecha(){return this.noticiaForm.get("fecha");}

  public onSave(e: Event): void {
    e.preventDefault();
    if(this.noticiaForm.get('img').value == null){
    const file = new File([],'');
    this.noticiaForm.get('img').setValue(file)
    }
    //Pasar de String a Date
    const date = new Date(this.noticiaForm.get('fecha').value)
    this.noticiaForm.get('fecha').setValue(date)
    //Enviar Form Data para que funcione la foto
    const formData = new FormData();
    formData.append('content',this.noticiaForm.get('contenidoHtml').value)
    formData.append('publicado',this.noticiaForm.get('publicada').value)
    formData.append('archivo',this.noticiaForm.get('img').value)
    formData.append('empresa',this.noticiaForm.get('empresa').value)
    formData.append('titulo',this.noticiaForm.get('titulo').value)
    formData.append('resumen',this.noticiaForm.get('resumen').value)
    formData.append('fecha',this.noticiaForm.get('fecha').value)
    if(this.item && this.item.id) {
      this.noticiaSvc.putWithFoto(formData, this.item.id).subscribe(data=>console.log(data));
    } else {
      this.noticiaSvc.postWithFoto(formData).subscribe(data=>console.log(data));
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

  onFileSelect(event) {
    const file = event.target.files[0];
    this.noticiaForm.get('img').setValue(file);
    console.log(file)
  }

}
