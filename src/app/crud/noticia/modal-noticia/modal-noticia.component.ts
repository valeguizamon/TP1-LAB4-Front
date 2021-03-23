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

  public notiForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private noticiaSvc: NoticiaService) {
    this.buildFormNot();
  }

  ngOnChanges(): void {
    this.buildFormNot(this.item);
  }

  ngOnInit(): void {
  }

  private buildFormNot(noti: Noticia = null): void {
    if(noti){
      this.notiForm.patchValue({
        titulo: noti.titulo,
        resumen: noti.resumen,
        imagenNoti: noti.imagenNoticia,
        contenidoHtml: noti.contenidoHtml,
        publicada: noti.publicada,
        fecha: noti.fecha,
      });
    } else {
      this.notiForm = this.formBuilder.group({
        titulo: ['', Validators.required],
        resumen: ['', Validators.required],
        imagenNot: ['', Validators.required],
        contenidoHtml: ['', Validators.required],
        publicada: ['', Validators.required],
        fecha: ['', Validators.required],
      });
    }
  }

  public onSave(e: Event): void {
    e.preventDefault();
    console.log(this.notiForm.value);
    if(this.item && this.item.id) {
      this.noticiaSvc.put(this.notiForm.value, this.item.id).subscribe(data=>console.log(data));
    } else {
      this.noticiaSvc.post(this.notiForm.value).subscribe(data=>console.log(data));
    }
    this.closeModal();
  }

  public closeModal(): void {
    this.item = null;
    this.resetForm();
    this.btnClose.nativeElement.click();
  }

  public resetForm(): void {
    this.notiForm.reset();
  }

}
