import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IncidenciasService } from '../../services/incidencias.service';
import { UpdateIncidenciaComponent } from '../update-incidencia/update-incidencia.component';

@Component({
  selector: 'app-detail-incidencia',
  templateUrl: './detail-incidencia.component.html',
  styleUrls: ['./detail-incidencia.component.scss'],
})
export class DetailIncidenciaComponent  implements OnInit {
  @Input() data: any;
  loading: boolean = true;
  detail: any;
  constructor(
    public modalCtrl: ModalController,
    private _incidencia:IncidenciasService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingCtrl: LoadingController,

  ) { 
  }

  ngOnInit() {
    this.getDetail()
  }

  handleRefresh(event: any) {
    this.detail = null
    this._incidencia.getIncidentesById(this.data.id).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.detail = data?.response
        event.target.complete();
      },
      error(err) { 
        console.log("err",err);
        
      },
    });
  }
  
  getDetail(){
    this.detail = null;
    this._incidencia.getIncidentesById(this.data.id).subscribe({
      next: (data: any) => {
        console.log("data",data.response);
        this.detail = data?.response
        this.loading = false;
      },
      error(err) { 
        console.log("err",err);
        
      },
    });
  }
  async openEdit() {
    const modal = await this.modalCtrl.create({
      component: UpdateIncidenciaComponent,
      componentProps: {
        data: this.detail
      }
    });
    modal.present();
    await modal.onWillDismiss().then(res=>{
      this.getDetail()
    })
  
  }

  return() {
    this.modalCtrl.dismiss();
  }

}
