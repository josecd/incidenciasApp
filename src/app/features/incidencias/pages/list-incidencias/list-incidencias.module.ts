import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListIncidenciasPageRoutingModule } from './list-incidencias-routing.module';

import { ListIncidenciasPage } from './list-incidencias.page';
import { CreateIncidenciaComponent } from '../../components/create-incidencia/create-incidencia.component';
import { DetailIncidenciaComponent } from '../../components/detail-incidencia/detail-incidencia.component';
import { UpdateIncidenciaComponent } from '../../components/update-incidencia/update-incidencia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListIncidenciasPageRoutingModule,
  ],
  declarations: [
    ListIncidenciasPage,
    CreateIncidenciaComponent,
    DetailIncidenciaComponent,
    UpdateIncidenciaComponent
  ]
})
export class ListIncidenciasPageModule {}
