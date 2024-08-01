import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  constructor(private _httpClient: HttpClient) { }

  getIncidentes() {
    return this._httpClient.get(environment.API_URL + '/incidencias/all-incidencias');
  }

  getIncidentesById(id:string) {
    return this._httpClient.get(environment.API_URL + '/incidencias/all-incidencias-id/'+id);
  }

  detele(id:string){
    return this._httpClient.delete(environment.API_URL + '/incidencias/delete/'+id);
  }

  create(data:any){
    return this._httpClient.post(environment.API_URL + '/incidencias/create' , data);
  }

  update(data:any){
    return this._httpClient.post(environment.API_URL + '/incidencias/update' , data);
  }

  getAllCatalogs(){
    return this._httpClient.get(environment.API_URL + '/catalog/list-catalogs');
  }
}
