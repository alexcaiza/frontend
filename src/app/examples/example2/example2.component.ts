
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cuota } from './../../models/Cuota';
import { Persona } from './../../models/Persona';
import { CuotasService } from './../../servicios/cuotas/cuotas.service';
import { Component, OnInit } from '@angular/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.css']
})
export class Example2Component implements OnInit {

  constructor(
    private cuotasService: CuotasService,
    public flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.buscarCuotas();
  }

  buscarCuotas() {
    console.log('METODO: ExampleComponent.buscarCuotas()');
    this.cuotasService.readCuotas().subscribe((cuotas: Cuota[]) => {
      this.cuotas = cuotas;
      console.log(this.cuotas);
      //this.flashMessagesService.show('La busqueda de cuotas se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

  buscarPersonas() {
    console.log('METODO: ExampleComponent.buscarPersonas()');
    this.cuotasService.readPersonas('').subscribe((personas: Persona[]) => {
      this.personas = personas;
      console.log(this.personas);
      this.flashMessagesService.show('La busqueda de personas se realizo correctamente.', { cssClass: 'alert-success', timeout: 4000 });
    });
  }

  keyword = 'descripcioncuota';
  cuotas = [];
  personas = [];

  selectEvent(item) {
    // do something with selected item
    console.log('METODO: selectEvent()');
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('METODO: onChangeSearch()');
  }
  
  onFocused(e){
    // do something when input is focused
    console.log('METODO: onFocused()');
  }

}
