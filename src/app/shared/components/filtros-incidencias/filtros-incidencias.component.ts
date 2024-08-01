import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-filtros-incidencias',
  templateUrl: './filtros-incidencias.component.html',
  styleUrls: ['./filtros-incidencias.component.scss'],
})
export class FiltrosIncidenciasComponent  implements OnInit {
  hoteles: any = []
  mes: any
  anio: any
  date: any
  datevalue: any = new Date().toISOString();
  constructor(
    private popCtrl: PopoverController,
    
  ) { }

  ngOnInit() {
    this.mes = moment().month()+1;
    this.anio = moment().year();
  }

  dismissPopover() {
    const filtros: any = {
      mes: this.mes,
      anio: this.anio,
    }
    this.popCtrl.dismiss({
      'fromPop': filtros
    });
  }
  updateMyDate($event: any) {
    this.mes = moment($event.detail.value).month() + 1;
    this.anio = moment($event.detail.value).year();
  }
}
