import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './core/interceptors/interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FiltrosIncidenciasComponent } from './shared/components/filtros-incidencias/filtros-incidencias.component';
import { DateTimeModalComponent } from './shared/components/date-time-modal/date-time-modal.component';
import { SelectPopoverComponent } from './shared/components/select-popover/select-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltrosIncidenciasComponent,
    DateTimeModalComponent,
    SelectPopoverComponent
  ],
  imports: [    
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    /* { 
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorService,
    multi:true 
   }, */
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
