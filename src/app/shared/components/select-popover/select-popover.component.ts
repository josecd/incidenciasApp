import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-popover',
  templateUrl: './select-popover.component.html',
  styleUrls: ['./select-popover.component.scss'],
})
export class SelectPopoverComponent implements OnInit   {
  filterCatalog: any;
  formCtrl: any;
  searchTerm = '';
  catalogs:any = [];
  filteredCatalogs:any = [];
  
  constructor(
    
    private modalController: ModalController) {
    
  }
  ngOnInit(): void {
    this.filterCatalogs()
  }
 
  filterCatalogs() {
    this.filteredCatalogs = this.catalogs.filter((catalog:any) =>
      catalog.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectCatalog(catalog:any) {
    const dataReturn = {
      formCtrl:this.formCtrl,
      item:catalog
    }
    this.modalController.dismiss(dataReturn);
  }


  dismiss() {
    this.modalController.dismiss();
  }
  return() {
    this.modalController.dismiss();
  }
}