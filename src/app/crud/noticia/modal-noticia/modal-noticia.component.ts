import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'modal-noticia',
  templateUrl: './modal-noticia.component.html',
  styleUrls: ['./modal-noticia.component.css']
})
export class ModalNoticiaComponent implements OnInit, OnChanges {

  @ViewChild('btnClose') btnClose : ElementRef;
  @Input() item: Noticia;

  public noticiaForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private noticiaSvc: NoticiaService) {
    this.buildFormNoticia();
  }

  ngOnChanges(): void {
    this.buildFormNoticia(this.item);
  }

  ngOnInit(): void {
  }

  private buildFormNoticia(noticia: Noticia = null): void {
    if(noticia){
      this.noticiaForm.patchValue({
        titulo: noticia.titulo,
        resumen: noticia.resumen,
        imagenNoticia: noticia.imagenNoticia,
        contenidoHtml: noticia.contenidoHtml,
        publicada: noticia.publicada,
        fecha: noticia.fecha,
        empresa: noticia.Empresa.id
      });
    } else {
      this.noticiaForm = this.formBuilder.group({
        titulo: ['', Validators.required],
        resumen: ['', Validators.required],
        imagenNoti: ['', Validators.required],
        contenidoHtml: ['', Validators.required],
        publicada: ['', Validators.required],
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
