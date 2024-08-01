import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'list-incidencias',
    loadChildren: () => import('./features/incidencias/pages/list-incidencias/list-incidencias.module').then( m => m.ListIncidenciasPageModule)
  },
  {
    path: 'home-list',
    loadChildren: () => import('./features/home/pages/home-list/home-list.module').then( m => m.HomeListPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./features/user-profile/pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
