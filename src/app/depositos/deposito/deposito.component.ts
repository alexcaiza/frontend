import { EventEmitterService } from './../../servicios/event-emitter.service';
import { DepositoListComponent } from './../deposito-list/deposito-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  //@ViewChild(DepositoListComponent, {static: false}) 
  //depositoListComponent: DepositoListComponent;

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
  }

  buscarDepositos() {
    console.log('METODO: DepositoComponent.buscarDepositos()');
    //console.log(this.depositoListComponent);
    //this.depositoListComponent.buscarDepositos();
    this.eventEmitterService.onFirstComponentButtonClick();
  }

}
