import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home-list', icon: 'home' },
    { title: 'Bitacora', url: '/list-incidencias', icon: 'bag' },
    { title: 'User', url: '/user-profile', icon: 'person' },

  ];
  constructor() {}

  logout(){
    console.log("cerrar sesion");
    
  }
}
