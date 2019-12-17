import { EventEmitterService } from './../../servicios/event-emitter.service';
import { Deposito } from './../../models/Deposito';
import { DepositosService } from './../../servicios/depositos/depositos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-deposito-list',
  templateUrl: './deposito-list.component.html',
  styleUrls: ['./deposito-list.component.css']
})
export class DepositoListComponent implements OnInit {

  public formBusqueda: FormGroup;

  depositos: Deposito[];

  constructor(
    private formBuilder: FormBuilder,
    private depositosService: DepositosService,
    public flashMessagesService: FlashMessagesService,
    private eventEmitterService: EventEmitterService
  ) {
    this.createFormBusqueda();
  }

  createFormBusqueda() {
    this.formBusqueda = this.formBuilder.group({
      cedula: [''],
      nombres: [''],
      apellidos: [''],
      numerodeposito: ['']
    });
  }

  ngOnInit() {
    console.log('METODO: ngOnInit()');

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe(() => {
        this.buscarDepositos();
      });
    }

    this.buscarDepositos();
  }

  buscarDepositos() {
    console.log('METODO: DepositoListComponent.buscarDepositos()');
    this.depositosService.readDepositos().subscribe((depositos: Deposito[]) => {
      this.depositos = depositos;
      console.log(this.depositos);
      this.flashMessagesService.show('La busqueda de depositos se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

  buscarDepositosFilters() {
    console.log('METODO: DepositoListComponent.buscarDepositosFilters()');

    console.log(this.formBusqueda.value);

    let datosSearch = this.formBusqueda.value;

    const nombres = this.formBusqueda.get("nombres").value;
    if (nombres && nombres != '') {
      let nombresVec = nombres.split(" ");
      console.log('primernombre' + nombresVec[0]);
      datosSearch.primernombre = nombresVec[0];
      if (nombresVec.length > 1) {
        console.log('segundonombre' + nombresVec[1]);
        datosSearch.segundonombre = nombresVec[1];
      }
    }

    const apellidos = this.formBusqueda.get("apellidos").value;
    if (apellidos && apellidos != '') {
      let apellidosVec = apellidos.split(" ");
      console.log('primerapellido' + apellidosVec[0]);
      datosSearch.primerapellido = apellidosVec[0];
      if (apellidosVec.length > 1) {
        console.log('segundoapellido' + apellidosVec[1]);
        datosSearch.segundoapellido = apellidosVec[1];
      }
    }

    this.depositosService.readDepositos().subscribe((depositos: Deposito[]) => {
      this.depositos = depositos;
      console.log(this.depositos);
      this.flashMessagesService.show('La busqueda de depositos se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

}
