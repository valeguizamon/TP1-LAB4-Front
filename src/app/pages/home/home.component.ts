import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//GoogleMaps
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
//Modelos
import { Empresa } from 'src/app/models/empresa';
import { Noticia } from 'src/app/models/noticia';
//Servicios
import { EmpresaService } from 'src/app/services/empresa.service';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public idEmpresa: number;
  public empresa: Empresa;
  public lastNoticias$: Observable<Noticia[]>;
  public indicators: number;

  public list: Array<any> = new Array(5);

  //Google Maps Variables
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChild('marker') marker: MapMarker;
  @ViewChild('map')map: GoogleMap;


  position:any ;
  center: google.maps.LatLngLiteral;
  zoom = 15;
  infoWindows: any;

  constructor(private empresaSvc: EmpresaService, private noticiaSvc: NoticiaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idEmpresa = this.route.snapshot.params['empresa'];
    this.getEmpresa();
    this.lastNoticias$ = this.noticiaSvc.getLastFiveNoticias(this.idEmpresa);
  }

  //Obtener empresa elegida
  public getEmpresa(){
    this.empresaSvc.getOne(this.idEmpresa).subscribe(e =>{
      this.empresa = e;
      this.position = {lat: e.lat, lng: e.lon}
      this.center =  {lat: e.lat, lng:  e.lon}
      this.infoWindows = {
        content:'<div>'+
         `<h3 class="display-6">${e.denominacion}</h3>`+
         `<p class="display-6 h6" style="color:#21c2f8;">Telefono: <strong style="color:black;font-weight: bold;">${e.telefono}</strong> </p>`+
         `<p class="display-6 h6" style="color:#21c2f8;">Domicilio: <strong style="color:black;">${e.domicilio}</strong></p>`+
         `<p class="display-6 h6" style="color:#21c2f8;">E-mail: <strong style="color:black;">${e.email}</strong></p>`+
         '</div>'
      }
      this.infoWindow.open(this.marker)
    });
  }
}
