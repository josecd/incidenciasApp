import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { CreateIncidenciaComponent } from '../../components/create-incidencia/create-incidencia.component';
import { DetailIncidenciaComponent } from '../../components/detail-incidencia/detail-incidencia.component';
import { FiltrosIncidenciasComponent } from 'app/shared/components/filtros-incidencias/filtros-incidencias.component';
import { IncidenciasService } from '../../services/incidencias.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-list-incidencias',
  templateUrl: './list-incidencias.page.html',
  styleUrls: ['./list-incidencias.page.scss'],
})
export class ListIncidenciasPage implements OnInit {
  loading: boolean = true;
  lists: any[] = [];
  page = 0;
  perPage = 10;

  array: any[] = [];
  dattemp = []
  items = [];
  count: number = 0;


  mes: any;
  anio: any

  constructor(
    public modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private popCtrl: PopoverController,
    private _incidentes: IncidenciasService,


  ) {

  }

  ngOnInit() {
    this.mes = moment().month() + 1;
    this.anio = moment().year();
    this.getIncidencias();
  }

  async openModalIncidencias() {
    const modal = await this.modalCtrl.create({
      component: CreateIncidenciaComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (data) {
      this.getIncidencias()
    } else {
      console.log(data);
    }
  }

  async openIncidencia(data: any) {
    const modal = await this.modalCtrl.create({
      component: DetailIncidenciaComponent,
      componentProps: {
        'data': data
      }
    });
    modal.present();

  }


  getIncidencias() {
    this.lists = []
    this.array = []
    this.page = 0
    this.perPage = 10;
    const filtros: any = {
      mes: this.mes,
      anio: this.anio,
    }
    console.log("ww");
    this._incidentes.getIncidentes().subscribe({
      next: async (data: any) => {
        console.log("data", data);
        this.array = data.response;
        this.lists = this.paginateArray();
        this.loading = false;
        this.dattemp = data.response
        for (let i = 0; i < 8; i++) {
          this.items.push(this.dattemp[this.count]);
          this.count++
        }
      },
      error(err) { },
    });
  }

  handleRefresh(event: any) {
    this.lists = []
    this.array = []
    this.page = 0
    this.perPage = 10;
    const filtros: any = {
      mes: this.mes,
      anio: this.anio,
    }
    this._incidentes.getIncidentes().subscribe({
      next: async (data: any) => {
        this.array = data.response;
        this.lists = this.paginateArray();
        this.loading = false;
        event.target.complete();
      },
      error(err) { },
    });
  }


  async deleteReporte(item: any) {
    const alert = await this.alertController.create({
      header: "Alerta",
      message: "¿Desea eliminar incidente?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Declined the offer");
          },
        },
        {
          text: "Aceptar",
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Borrando...',
            });
            loading.present();

            this._incidentes.detele(item.id).subscribe({
              next: (data) => {
                loading.dismiss();
                this.getIncidencias();
              },
              error(err) { },
            });
          },
        },
      ],
    });

    await alert.present();
  }
  paginateArray() {
    this.page++;
    return this.array.filter(
      x => x.idReporte > (this.page * this.perPage - this.perPage) && x.idReporte <= (this.page * this.perPage)
    );
  }
  onIonInfinite(ev: any) {
    this.ge();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  async _popOver(ev: any) {
    const popOver = await this.popCtrl.create({
      component: FiltrosIncidenciasComponent,
      cssClass: 'my-popover-class',
      event: ev,
    })
    popOver.onDidDismiss().then(data => {
      this.mes = data.data['fromPop']['mes']
      this.anio = data.data['fromPop']['anio']
      this.getIncidencias()
    })
    return await popOver.present()
  }
  ge() {

    for (let i = 0; i < 8; i++) {
      this.items.push(this.dattemp[this.count]);
      this.count++
    }
  }
}
