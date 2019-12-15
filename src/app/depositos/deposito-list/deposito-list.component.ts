import { EventEmitterService } from './../../servicios/event-emitter.service';
import { Deposito } from './../../models/Deposito';
import { DepositosService } from './../../servicios/depositos/depositos.service';
import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-deposito-list',
  templateUrl: './deposito-list.component.html',
  styleUrls: ['./deposito-list.component.css']
})
export class DepositoListComponent implements OnInit {

  depositos: Deposito[];

  constructor(
    private depositosService: DepositosService,
    public flashMessagesService: FlashMessagesService,
    private eventEmitterService: EventEmitterService
    ) { }

  ngOnInit() {
    console.log('METODO: ngOnInit()');

    if (this.eventEmitterService.subsVar==undefined) {    
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

}
