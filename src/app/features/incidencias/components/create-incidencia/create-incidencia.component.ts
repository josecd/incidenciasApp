import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonDatetime, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { IncidenciasService } from '../../services/incidencias.service';
import { DateTimeModalComponent } from 'app/shared/components/date-time-modal/date-time-modal.component';
import * as moment from 'moment-timezone';
import { SelectPopoverComponent } from 'app/shared/components/select-popover/select-popover.component';

@Component({
  selector: 'app-create-incidencia',
  templateUrl: './create-incidencia.component.html',
  styleUrls: ['./create-incidencia.component.scss'],
})
export class CreateIncidenciaComponent  implements OnInit {
  @ViewChild('fechaPicker', { static: false }) fechaPicker!: IonDatetime;
  @ViewChild('horaPicker', { static: false }) horaPicker!: IonDatetime;

  incidenciaForm!: FormGroup;
  catalogs:any
  meetingTime!: string;
  selectedTema: any;

  constructor(
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private _incidentes: IncidenciasService,
    private alertController: AlertController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.getCatalogs()
    this.incidenciaForm = this.formBuilder.group({
      fecha_select: ['',[Validators.required, ]],
      hora_select: ['',[Validators.required, ]],
      tema: ['',[Validators.required ]],
      equipo: ['',[Validators.required ]],
      ubicacion: ['',[Validators.required ]],
      descripcion_incidente: ['',[Validators.required ]],
      recibe_reporte: ['',[Validators.required ]],
      quien_reporta: ['',[Validators.required ]],
      quien_realiza: ['',[Validators.required ]],
    });
  }

  async submitForm(){
    const loading = await this.loadingCtrl.create({
      message: 'Subiendo información...',
    });
    loading.present();

    console.log(this.incidenciaForm.value);
    
    this._incidentes.create(this.incidenciaForm.value).subscribe({
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

  filteredCatalogs(type:string) {
    return this.catalogs?.filter((catalog:any) => catalog.type === type);
  }

  getCatalogs(){
    this._incidentes.getAllCatalogs().subscribe({
      next: (data:any) => {
        console.log("data catalgos", data);
        this.catalogs = data?.response
      },
      error: async (err)=>{
       console.log("error", err);
       
      },
    })
  }
  handleChange(ev:any) {
    /* this.incidenciaForm.value['hotelId'] = ev.target.value;
    this.hotelSelect = ev.target.value; */
  }

  return() {
    this.modalCtrl.dismiss();
  }
  openDatePicker(type: string) {
    /* if (type === 'fecha') {
      this.fechaPicker.open();
    } else if (type === 'hora') {
      this.horaPicker.open();
    } */
  }

  setDate(event: any, type: string) {
    const value = event.detail.value;
    if (type === 'fecha') {
      this.incidenciaForm.controls['fecha_select'].setValue(value);
    } else if (type === 'hora') {
      this.incidenciaForm.controls['hora_select'].setValue(value);
    }
  }

  async openDateTimeModal(type:string) {
    const modal = await this.modalCtrl.create({
      component: DateTimeModalComponent,
      componentProps: {
        'data': type
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.fecha) {
        const date = moment(data.fecha);
        const formattedDate = date.format('YYYY-MM-DD'); 
        this.incidenciaForm.controls['fecha_select'].setValue(formattedDate);  
      }else if(data.hora){
        const date_hora = moment(data.hora);
        const formattedDateHora = date_hora.format('HH:mm:ss A'); 
        console.log("for",formattedDateHora);
        
        this.incidenciaForm.controls['hora_select'].setValue(formattedDateHora);
        console.log("formattedDate",formattedDateHora);
      } 
    }
  }
  async presentPopover(filterCatalog:string, formCtrl:string) {
    const popover = await this.modalCtrl.create({
      component: SelectPopoverComponent,
      componentProps: {
        catalogs: this.filteredCatalogs(filterCatalog),
        filterCatalog:filterCatalog,
        formCtrl:formCtrl
      }
    });
    await popover.present();

    popover.onDidDismiss().then((result) => {
      if (result.data) {
        console.log("result",result);
        this.incidenciaForm.controls[result.data.formCtrl].setValue(result.data.item.name);  
      }
    });

  }

}
