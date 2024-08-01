import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-time-modal',
  templateUrl: './date-time-modal.component.html',
  styleUrls: ['./date-time-modal.component.scss'],
})
export class DateTimeModalComponent  {
  @Input() data: any;
  form: FormGroup;

  constructor(private modalController: ModalController, private fb: FormBuilder) {
    this.form = this.fb.group({
      fecha_select: [''],
      hora_select: ['']
    });
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    const { fecha_select, hora_select } = this.form.value;
    this.modalController.dismiss({ fecha: fecha_select, hora: hora_select });
  }
  return() {
    this.modalController.dismiss();
  }
}