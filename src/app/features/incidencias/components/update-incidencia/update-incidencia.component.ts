import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { IncidenciasService } from '../../services/incidencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-incidencia',
  templateUrl: './update-incidencia.component.html',
  styleUrls: ['./update-incidencia.component.scss'],
})
export class UpdateIncidenciaComponent  implements OnInit {
  @Input() data: any;
  incidenciaForm!: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private _incidentes: IncidenciasService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    console.log("this.data",this.data);
    
    this.incidenciaForm = this.formBuilder.group({
      id:[this.data.id],
      reporte_inicial: [this.data.reporte_inicial],
      acciones_realiazadas: [this.data.acciones_realiazadas],
      estatus_final: [this.data.estatus_final],
      causa_raiz: [this.data.causa_raiz],
      vale: [this.data.vale],
      observaciones: [this.data.observaciones],
    });
  }

  async submitForm(){
    const loading = await this.loadingCtrl.create({
      message: 'Subiendo información...',
    });
    loading.present();

    console.log(this.incidenciaForm.value);
    
    this._incidentes.update(this.incidenciaForm.value).subscribe({
      next: (data:any) => {
        loading.dismiss();
        this.modalCtrl.dismiss(true, "msg");
      },
      error: async (err)=>{
        const alert = await this.alertController.create({
          header: 'Alerta',
          subHeader: 'Intente más tarde',
          message: 'Ha ocurrido un error',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
  return() {
    this.modalCtrl.dismiss();
  }
}
